# Weather App

## Overview

The Weather App is a web-based application that provides real-time weather information and a 7-day forecast for any city worldwide. It uses WeatherAPI to deliver accurate and up-to-date weather data.

🔗 **Live Demo**: [weather-app-kappa-teal-50.vercel.app](https://weather-app-kappa-teal-50.vercel.app/)

## Features

* Search for any city using a dynamic search bar
* Real-time weather data (temperature, condition, feels like)
* Additional weather details:

  * Humidity
  * Wind speed
  * Pressure
* 7-day weather forecast
* City suggestions (autocomplete)
* Automatic location detection using geolocation
* Fallback to default city if location access is denied

## Technologies Used

* HTML5
* CSS (Tailwind-based styling)
* JavaScript (Vanilla JS)
* WeatherAPI ([https://www.weatherapi.com/](https://www.weatherapi.com/))

## Project Structure

```
├── index.html
├── script.js
├── src/
│   └── output.css
├── images/
│   ├── pin.png
│   ├── cloud.png
│   ├── drop.png
│   ├── wind.png
│   └── gauge.png

## How It Works

* Fetches weather data using the `forecast.json` endpoint
* Updates UI dynamically with current weather and forecast
* Provides city suggestions based on user input
* Uses geolocation to detect user's current location

## Error Handling

* Shows alert if city is not found
* Falls back to Jakarta if location access is denied
* Handles empty search input properly

## Future Improvements

* Add loading states (skeleton UI)
* Improve error handling UI (replace alerts)
* Add temperature unit toggle (°C / °F)
* Enhance UI animations
* Store recent searches using local storage

## License

This project is for educational purposes and can be modified and distributed freely.

## Author

Developed by **Anas F.**
