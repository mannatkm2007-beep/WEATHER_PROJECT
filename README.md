# Weather Dashboard

A simple weather dashboard that lets you search any city and see its current weather conditions instantly.

This is a personal project built by Harsimran Kaur as part of coursework exploring HTML, CSS, and JavaScript with real-world APIs.

## What it does

- Type in a city name and get:
  - Current temperature
  - "Feels like" temperature
  - Weather condition (e.g. clear sky, rain, cloudy) with a matching icon
  - Wind speed
  - Humidity
  - Last updated time

## How it works

The app uses the **Open-Meteo API** — a free weather API that doesn't require an API key.

1. The city name you type is sent to Open-Meteo's geocoding endpoint, which converts it into latitude and longitude coordinates.
2. Those coordinates are then used to fetch the current weather from Open-Meteo's forecast endpoint.
3. The weather code returned by the API is mapped to a plain-English label and an emoji icon.

## Technologies used

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks or libraries)
- [Open-Meteo API](https://open-meteo.com/)

## How to run it

1. Download or clone this repository.
2. Open `index.html` in any web browser.
3. Type a city name into the search box and click Search.

No installation or build steps needed — it's a static site that runs entirely in the browser.

## Files

- `index.html` — page structure and layout
- `style.css` — styling
- `script.js` — fetches data from the Open-Meteo API and updates the page

## Known limitations

- If a city name matches multiple places (e.g. "Springfield"), the dashboard shows the first match returned by the API.
- Requires an internet connection, since it calls a live API.

## Author

Harsimran Kaur
