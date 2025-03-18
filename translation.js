const translations = {
    en: {
        welcomeTitle: "🌾 Welcome to Farm Matrix Weather Alerter! 🌦️",
        welcomeMessage: "Your smart assistant for better farming decisions.",
        mainTitle: "🌾 Farm Matrix Weather Alerter 🌦️",
        languageLabel: "🌍 Choose Language:",
        getLocationBtn: "🌍 Get My Location",
        rainHigh: "⚠️ Heavy Rain Expected! Protect your crops and avoid field work.",
        rainModerate: "☔ Light Rain Expected! It's a good time for soil moisture retention.",
        noRain: "🌞 No Rain Today! Water your garden and check for pests.",
        strongWinds: "🌬️ Strong Winds! Secure your crops and structures.",
        moderateWinds: "💨 Moderate Winds! Be cautious with pesticide spraying.",
        highHumidity: "🌫️ High Humidity! Watch out for fungal infections in crops."
    },
    es: {
        welcomeTitle: "🌾 ¡Bienvenido a Farm Matrix Weather Alerter! 🌦️",
        welcomeMessage: "Tu asistente inteligente para mejores decisiones agrícolas.",
        mainTitle: "🌾 Farm Matrix Weather Alerter 🌦️",
        languageLabel: "🌍 Elige idioma:",
        getLocationBtn: "🌍 Obtener mi ubicación",
        rainHigh: "⚠️ ¡Lluvias fuertes esperadas! Protege tus cultivos y evita el trabajo en el campo.",
        rainModerate: "☔ ¡Lluvias ligeras esperadas! Es un buen momento para retener la humedad del suelo.",
        noRain: "🌞 ¡No hay lluvia hoy! Riega tu jardín y revisa las plagas.",
        strongWinds: "🌬️ ¡Vientos fuertes! Asegura tus cultivos y estructuras.",
        moderateWinds: "💨 ¡Vientos moderados! Ten cuidado con la pulverización de pesticidas.",
        highHumidity: "🌫️ ¡Alta humedad! Cuidado con las infecciones fúngicas en los cultivos."
    },
    hi: {
        welcomeTitle: "🌾 फार्म मैट्रिक्स वेदर अलर्टर में आपका स्वागत है! 🌦️",
        welcomeMessage: "बेहतर कृषि निर्णयों के लिए आपका स्मार्ट सहायक।",
        mainTitle: "🌾 फार्म मैट्रिक्स वेदर अलर्टर 🌦️",
        languageLabel: "🌍 भाषा चुनें:",
        getLocationBtn: "🌍 मेरी लोकेशन प्राप्त करें",
        rainHigh: "⚠️ भारी बारिश की संभावना! अपनी फसलों को सुरक्षित रखें और खेत के काम से बचें।",
        rainModerate: "☔ हल्की बारिश की संभावना! मिट्टी की नमी बनाए रखने का यह अच्छा समय है।",
        noRain: "🌞 आज बारिश नहीं! अपने बगीचे को पानी दें और कीटों की जांच करें।",
        strongWinds: "🌬️ तेज़ हवाएं! अपनी फसलों और संरचनाओं को सुरक्षित करें।",
        moderateWinds: "💨 मध्यम हवाएं! कीटनाशक छिड़काव करते समय सतर्क रहें।",
        highHumidity: "🌫️ उच्च आर्द्रता! फसलों में फंगल संक्रमण से सावधान रहें।"
    }
};

function changeLanguage() {
    let selectedLang = document.getElementById("languageSelect").value;
    document.getElementById("welcomeTitle").innerText = translations[selectedLang].welcomeTitle;
    document.getElementById("welcomeMessage").innerText = translations[selectedLang].welcomeMessage;
    document.getElementById("mainTitle").innerText = translations[selectedLang].mainTitle;
    document.getElementById("languageLabel").innerText = translations[selectedLang].languageLabel;
    document.getElementById("getLocationBtn").innerText = translations[selectedLang].getLocationBtn;
}
