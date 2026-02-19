
import { NextRequest, NextResponse } from "next/server";
import timings from "@/data/timings.json";
import { DateTime, Duration } from "luxon";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> },
) {
    const { filename } = await params;
    const match = filename.match(/^([a-z_]+)-(-?\d+)\.ics$/);

    if (!match) {
        return new NextResponse("Invalid filename", { status: 400 });
    }

    const [, calendarKey, offsetStr] = match;
    const offsetMin = parseInt(offsetStr);

    // Validate calendar key
    if (!Object.keys(timings).includes(calendarKey)) {
        return new NextResponse("Calendar not found", { status: 404 });
    }

    const calendarData = timings[calendarKey as keyof typeof timings];
    const year = 2026; // Hardcoded as per current context

    // Determine Sehri specific offset (Ahtiyat)
    let sehriAdjustment = 0;
    if (calendarKey === "etk") {
        sehriAdjustment = -10;
    } else if (calendarKey === "ajksa") {
        sehriAdjustment = -5;
    }

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Iftarkar//Ramadan 2026//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Ramadan 2026 (${calendarData.name})
X-WR-TIMEZONE:Asia/Kolkata
BEGIN:VTIMEZONE
TZID:Asia/Kolkata
X-LIC-LOCATION:Asia/Kolkata
BEGIN:STANDARD
TZOFFSETFROM:+0530
TZOFFSETTO:+0530
TZNAME:IST
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE
`;

    const locationOffset = Duration.fromObject({ minutes: offsetMin });
    const sehriBuffer = Duration.fromObject({ minutes: sehriAdjustment });

    Object.entries(calendarData.timings).forEach(([dateKey, times]) => {
        // dateKey is DDMM
        const day = dateKey.slice(0, 2);
        const month = dateKey.slice(2, 4);

        // Parse base times
        const sehriTime = DateTime.fromFormat(`${year}-${month}-${day} ${times.fajr}`, "yyyy-MM-dd HH:mm", { zone: "Asia/Kolkata" })
            .plus(locationOffset)
            .plus(sehriBuffer);

        const iftarTime = DateTime.fromFormat(`${year}-${month}-${day} ${times.maghrib}`, "yyyy-MM-dd HH:mm", { zone: "Asia/Kolkata" })
            .plus(locationOffset);

        // Create Sehri Event (End of Sehri)
        // We'll create a 5 min event ending at Sehri time
        const sehriStart = sehriTime.minus({ minutes: 5 });

        icsContent += `BEGIN:VEVENT
DTSTART;TZID=Asia/Kolkata:${sehriStart.toFormat("yyyyMMdd'T'HHmmss")}
DTEND;TZID=Asia/Kolkata:${sehriTime.toFormat("yyyyMMdd'T'HHmmss")}
SUMMARY:Sehri Ends
DESCRIPTION:Sehri ends at ${sehriTime.toFormat("hh:mm a")}
UID:sehri-${dateKey}-2026@iftarkar.com
END:VEVENT
`;

        // Create Iftar Event
        const iftarEnd = iftarTime.plus({ minutes: 5 });

        icsContent += `BEGIN:VEVENT
DTSTART;TZID=Asia/Kolkata:${iftarTime.toFormat("yyyyMMdd'T'HHmmss")}
DTEND;TZID=Asia/Kolkata:${iftarEnd.toFormat("yyyyMMdd'T'HHmmss")}
SUMMARY:Iftar
DESCRIPTION:Iftar time at ${iftarTime.toFormat("hh:mm a")}
UID:iftar-${dateKey}-2026@iftarkar.com
END:VEVENT
`;
    });

    icsContent += "END:VCALENDAR";

    return new NextResponse(icsContent, {
        headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": `attachment; filename="${calendarData.name.replace(/[^a-z0-9]/gi, '_')}.ics"`,
        },
    });
}

export async function generateStaticParams() {
    const params = [];
    for (const key of Object.keys(timings)) {
        // Add base offset 0
        params.push({ filename: `${key}-0.ics` });

        // Add other offsets
        const calendar = timings[key as keyof typeof timings];
        for (const offsetObj of calendar.offsets) {
            params.push({ filename: `${key}-${offsetObj.offset}.ics` });
        }
    }
    return params;
}
