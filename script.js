document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "5c83d108bd45499e97f111053251803";  // Replace with your API key
    const weatherText = document.getElementById("weather");
    const adviceText = document.getElementById("advice");
    const getLocationBtn = document.getElementById("getLocationBtn");
    const popup = document.getElementById("welcomePopup");
    const closePopup = document.getElementById("closePopup");
    const languageSelect = document.getElementById("languageSelect");

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

            // Update weather info
            weatherText.innerHTML = `🌡️ Temperature: ${temp}°C <br> 🌥️ Condition: ${condition}`;

            // Farming Advice
            let advice = "";
            if (rain > 10) {
                advice = "🚨 Heavy Rain Alert! Avoid farming today.";
            } else if (rain > 0) {
                advice = "🌦️ Light rain expected. Use proper drainage.";
            } else {
                advice = "☀️ No rain today! You should water the crops.";
            }

            adviceText.dataset.advice = advice; // Store original advice for translation
            updateTranslation();

        } catch (err) {
            console.error("❌ Error Fetching Weather Data:", err.message);
            weatherText.innerHTML = "❌ Error fetching weather data! Check console.";
        }
    }

    // 🌎 Translation dictionary
    const translations = {
        "en": {
            "🚨 Heavy Rain Alert! Avoid farming today.": "🚨 Heavy Rain Alert! Avoid farming today.",
            "🌦️ Light rain expected. Use proper drainage.": "🌦️ Light rain expected. Use proper drainage.",
            "☀️ No rain today! You should water the crops.": "☀️ No rain today! You should water the crops."
        },
        "ta": { // Tamil 🇮🇳
            "🚨 Heavy Rain Alert! Avoid farming today.": "🚨 கனமழை எச்சரிக்கை! இன்று விவசாயம் செய்ய வேண்டாம்.",
            "🌦️ Light rain expected. Use proper drainage.": "🌦️ சிறிய மழை எதிர்பார்க்கப்படுகிறது. சரியான வடிகால் பயன்படுத்து.",
            "☀️ No rain today! You should water the crops.": "☀️ இன்று மழை இல்லை! பயிர்களுக்கு நீர் கொடு."
        },
        "hi": { // Hindi 🇮🇳
            "🚨 Heavy Rain Alert! Avoid farming today.": "🚨 भारी बारिश की चेतावनी! आज खेती से बचें।",
            "🌦️ Light rain expected. Use proper drainage.": "🌦️ हल्की बारिश की संभावना। उचित जल निकासी का उपयोग करें।",
            "☀️ No rain today! You should water the crops.": "☀️ आज बारिश नहीं! फसलों को पानी दें।"
        },
        "fr": { // French 🇫🇷
            "🚨 Heavy Rain Alert! Avoid farming today.": "🚨 Alerte forte pluie ! Évitez l'agriculture aujourd'hui.",
            "🌦️ Light rain expected. Use proper drainage.": "🌦️ Pluie légère attendue. Utilisez un drainage approprié.",
            "☀️ No rain today! You should water the crops.": "☀️ Pas de pluie aujourd'hui ! Vous devez arroser les cultures."
        },
        "es": { // Spanish 🇪🇸
            "🚨 Heavy Rain Alert! Avoid farming today.": "🚨 Alerta de lluvia intensa! Evita la agricultura hoy.",
            "🌦️ Light rain expected. Use proper drainage.": "🌦️ Se espera lluvia ligera. Usa un drenaje adecuado.",
            "☀️ No rain today! You should water the crops.": "☀️ No hay lluvia hoy! Debes regar los cultivos."
        }
    };

    // Function to update translation
    function updateTranslation() {
        const selectedLang = languageSelect.value;
        const originalText = adviceText.dataset.advice;
        adviceText.innerHTML = translations[selectedLang]?.[originalText] || originalText;
    }

    // Change translation when language is selected
    languageSelect.addEventListener("change", updateTranslation);
});
