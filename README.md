# 🌙 Iftarkar

**Iftarkar** is a modern, beautiful, and easy-to-use Ramadan timings application designed for the region of Kashmir. It provides accurate Sehri and Iftar timings for various districts and follows multiple schools of thought (Fiqh).

Built with **Next.js**, **Tailwind CSS**, and **TypeScript**, Iftarkar focuses on performance, aesthetics, and usability.

![Iftarkar Preview]("https://res.cloudinary.com/dhwrnmpds/image/upload/v1771484035/homescreeb_b6t82l.jpg")

## ✨ Features

- **📍 Location-Based Timings**: accurate schedules for all major districts in Kashmir (Srinagar, Budgam, Baramulla, etc.).
- **📅 Multiple Calendars**: Supports varying schools of thought:
  - **Hanafi**: Dar-ul-uloom Raheemiya
  - **Jaffaria**: Educational Trust Kashmir (ETK)
  - **Ahle Hadees**: Jamiat Ahle Hadees J&K
- **🎨 Print-Friendly**: Generate beautiful, high-quality printable calendars directly from the browser.
- **📥 Export Options**:
  - **iCal**: Download calendar files (`.ics`) to import into Google Calendar or Apple Calendar.
  - **PDF**: Save the monthly schedule as a PDF/Image.
- **📱 PWA Support**: Installable as a native-like app on Android and iOS.
- **⚡ Offline Ready**: Works seamlessly without an internet connection once loaded.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [FontAwesome](https://fontawesome.com/)
- **Date Handling**: [Luxon](https://moment.github.io/luxon/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SyedFahad-CS/iftarkar.git
   cd iftarkar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app running.

## 📅 Data Source

The application uses **hardcoded timings** for maximum reliability during the holy month.
- Data is stored in: `data/timings.json`
- This ensures that even if external APIs go down, the users always have access to the correct schedule.

## 📦 Build & Deployment

To build the application for production:

```bash
npm run build
```

This generates a static/optimized build in the `.next` folder. The app is optimized for deployment on platforms like **Vercel** or **Netlify**.

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to add a new feature:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

## ❤️ Credits

- **Original Idea & Development**: [Haider Ali Punjabi](https://haider.id)
- **Maintainer**: Syed Fahad
