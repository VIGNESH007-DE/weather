document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("welcomePopup").style.display = "flex";
});

// Close the popup
function closePopup() {
    document.getElementById("welcomePopup").style.display = "none";
}

// Fetch weather data
async function getWeather() {
    let city = document.getElementById("city").value || "Delhi"; // Default city
    let apiKey = "5c83d108bd45499e97f111053251803"; // Replace with your API Key
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        let temp = data.current.temp_c;
        let rain = data.current.precip_mm;
        let humidity = data.current.humidity;
        let windSpeed = data.current.wind_kph;
        
        document.getElementById("weather").innerHTML = `
            <strong>🌍 Location:</strong> ${data.location.name}, ${data.location.country}<br>
            <strong>🌡️ Temperature:</strong> ${temp}°C<br>
            <strong>☔ Rain:</strong> ${rain} mm<br>
            <strong>💧 Humidity:</strong> ${humidity}%<br>
            <strong>🌬️ Wind Speed:</strong> ${windSpeed} kph
        `;

        // Farming Advice
        let advice = "";
        if (rain > 10) {
            advice = "⚠️ Heavy Rain Expected! Protect your crops and avoid field work.";
        } else if (rain > 5) {
            advice = "☔ Light Rain Expected! It's a good time for soil moisture retention.";
        } else {
            advice = "🌞 No Rain Today! Water your garden and check for pests.";
        }

        if (windSpeed > 40) {
            advice += "<br>🌬️ Strong Winds! Secure your crops and structures.";
        } else if (windSpeed > 20) {
            advice += "<br>💨 Moderate Winds! Be cautious with pesticide spraying.";
        }

        if (humidity > 80) {
            advice += "<br>🌫️ High Humidity! Watch out for fungal infections in crops.";
        }

        document.getElementById("advice").innerHTML = `<strong>🌾 Farming Advice:</strong> ${advice}`;
    } catch (error) {
        document.getElementById("weather").innerHTML = "❌ Error fetching weather data!";
        document.getElementById("advice").innerHTML = "";
    }
}
