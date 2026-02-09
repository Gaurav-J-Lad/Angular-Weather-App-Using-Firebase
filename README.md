# ✅ Weather App | Angular + Firebase Authentication

A modern **Weather Forecast Application** built using **Angular (Standalone Components)**, **Firebase Authentication**, and **OpenWeather API**.  
The app provides protected routing, real-time weather data fetching, and a smooth user experience with a global loading system.

---

## 🎨 Features

- 🔐 Firebase Authentication (Signup / Login / Logout)
- 🛡️ Auth Guard & Public Guard for route protection
- 🌤️ Search for weather by city
- 📊 Display current weather and temperature
- ⏳ Global loading indicator for async API calls
- 🎨 Clean and responsive UI
- 📱 Mobile-friendly layout

---

## 🛠️ Built With

| Technology                         | Purpose                    |
| ---------------------------------- | -------------------------- |
| 🅰️ Angular (Standalone Components) | Frontend framework         |
| 🔥 Firebase Authentication         | User authentication        |
| 🌐 OpenWeather API                 | Fetching weather data      |
| 📦 Reactive Forms                  | Form handling & validation |
| 🛡️ Angular Route Guards            | Protected navigation       |
| 🔄 RxJS                            | Async data handling        |
| 🎨 CSS                             | UI styling                 |

---

## 📸 Screenshots

### 🔐 Login Page

![Login Page Screenshot](screenshots/login.png)

### 📝 Signup Page

![Signup Page Screenshot](screenshots/signup.png)

### 🌤️ Weather Dashboard

![Weather Dashboard Screenshot](screenshots/weather-dashboard.png)

---

## 🌐 Live Demo

🌐 **Netlify Live Demo:**  
👉 https://angular-weather-app-firebase.netlify.app

---

## 🔑 Demo Login Credentials

Use the following credentials to test the application:

- **Email:** `xyz@gmail.com`
- **Password:** `123456`

_(You can also create a new account using the signup page.)_

---

## 🔐 Authentication Flow

- Signup creates a new Firebase account
- Login authenticates the user
- Auth Guard protects `/weather`
- Public Guard blocks `/login` & `/signup` after login
- Logout signs out and redirects to login page

---

## ⏳ Global Loader

The loader appears during:

- Signup process
- Login process
- API calls to fetch weather
- Firebase async operations

This ensures clear user feedback during async operations.

---

## 📂 Pages

- `/signup` – Create account
- `/login` – Login page
- `/weather` – Protected weather dashboard

---

## 📧 Let’s Connect

🔗 **LinkedIn**  
https://www.linkedin.com/in/gaurav-lad1974

📨 **Email**  
gauravlad1974@gmail.com
