const WEATHER_API_KEY = "00385fe64e3347bcba9110546251803";
const TWILIO_API_URL = "https://your-backend-server/send-whatsapp";  // Backend API URL

function getWeather() {
    let city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city!");
        return;
    }

    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            let weather = data.weather[0].main;
            let rainVolume = data.rain ? data.rain["1h"] || 0 : 0;  // Rain in mm
            let temperature = data.main.temp;

            let resultDiv = document.getElementById("weatherResult");
            resultDiv.innerHTML = `
                <h3>${city.toUpperCase()}</h3>
                <p>Temperature: ${temperature}°C</p>
                <p>Weather: ${weather}</p>
                <p>Rain Volume (last 1 hour): ${rainVolume} mm</p>
            `;

            if (rainVolume > 5) {  // If rain is heavy (>5mm)
                sendWhatsAppAlert(city, rainVolume);
            }
        })
        .catch(error => console.error("Error fetching weather data:", error));
}

function sendWhatsAppAlert(city, rainVolume) {
    fetch(TWILIO_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            city: city,
            rain: rainVolume
        })
    })
    .then(response => response.json())
    .then(data => alert("WhatsApp alert sent successfully!"))
    .catch(error => console.error("Error sending WhatsApp message:", error));
}
