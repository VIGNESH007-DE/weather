document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "5c83d108bd45499e97f111053251803";  // Replace with your API key
    const weatherText = document.getElementById("weather");
    const adviceText = document.getElementById("advice");
    const getLocationBtn = document.getElementById("getLocationBtn");
    const popup = document.getElementById("welcomePopup");
    const closePopup = document.getElementById("closePopup");

    // Close the welcome popup
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Get weather when button is clicked
    getLocationBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert("❌ Geolocation is not supported by your browser.");
        }
    });

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(`📍 Location Found: ${lat}, ${lon}`);
        fetchWeather(lat, lon);
    }

    function error(err) {
        console.error("❌ Geolocation Error:", err.message);
        alert("❌ Location access denied. Enable it in browser settings.");
    }

    async function fetchWeather(lat, lon) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const data = await response.json();
            console.log("✅ Weather Data:", data);

            const temp = data.current.temp_c;
            const condition = data.current.condition.text;
            const rain = data.current.precip_mm;  // Rain in mm

            weatherText.innerHTML = `🌡️ Temperature: ${temp}°C <br> 🌥️ Condition: ${condition}`;

            if (rain > 10) {
                adviceText.innerHTML = "🚨 Heavy Rain Alert! Avoid farming today.";
            } else if (rain > 0) {
                adviceText.innerHTML = "🌦️ Light rain expected. Use proper drainage.";
            } else {
                adviceText.innerHTML = "☀️ No rain today! You should water the crops.";
            }

        } catch (err) {
            console.error("❌ Error Fetching Weather Data:", err.message);
            weatherText.innerHTML = "❌ Error fetching weather data! Check console.";
        }
    }
});
