document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "5c83d108bd45499e97f111053251803";  // Replace with your WeatherAPI key
    const weatherText = document.getElementById("weather");
    const adviceText = document.getElementById("advice");
    const getLocationBtn = document.getElementById("getLocationBtn");

    // Show the welcome popup
    const popup = document.getElementById("welcomePopup");
    popup.style.display = "flex";

    document.getElementById("closePopup").addEventListener("click", () => {
        popup.style.display = "none";
    });

    getLocationBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(lat, lon);
    }

    function error() {
        alert("Unable to retrieve your location.");
    }

    async function fetchWeather(lat, lon) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch weather data");
            
            const data = await response.json();
            const temp = data.current.temp_c;
            const condition = data.current.condition.text;
            const rain = data.current.precip_mm;  // Rain in mm

            weatherText.innerHTML = `🌡️ Temperature: ${temp}°C <br> 🌥️ Condition: ${condition}`;
            
            if (rain > 10) {
                adviceText.innerHTML = "🌧️ Heavy Rain Alert! Farming not recommended today.";
            } else if (rain > 0) {
                adviceText.innerHTML = "🌦️ Light rain expected. Use proper drainage.";
            } else {
                adviceText.innerHTML = "☀️ No rain today! You should water the crops.";
            }

        } catch (err) {
            console.error("Error fetching weather:", err);
            weatherText.innerHTML = "❌ Error fetching weather data!";
        }
    }
});
