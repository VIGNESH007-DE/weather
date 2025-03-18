document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("welcomePopup").style.display = "flex";
    let browserLang = navigator.language.slice(0, 2);
    if (translations[browserLang]) {
        document.getElementById("languageSelect").value = browserLang;
        changeLanguage();
    }
});

function closePopup() {
    document.getElementById("welcomePopup").style.display = "none";
}

async function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

async function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "5c83d108bd45499e97f111053251803";
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

    let lang = document.getElementById("languageSelect").value;

    try {
        let response = await fetch(url);
        let data = await response.json();
        let rain = data.current.precip_mm;
        let windSpeed = data.current.wind_kph;
        let advice = translations[lang].noRain;

        if (rain > 10) advice = translations[lang].rainHigh;
        else if (rain > 5) advice = translations[lang].rainModerate;
        
        if (windSpeed > 40) advice += "<br>" + translations[lang].strongWinds;
        else if (windSpeed > 20) advice += "<br>" + translations[lang].moderateWinds;

        document.getElementById("weather").innerHTML = `<strong>🌡️ ${data.location.name}, ${data.location.country}</strong>`;
        document.getElementById("advice").innerHTML = `<strong>🌾 ${advice}</strong>`;
    } catch {
        document.getElementById("weather").innerHTML = "❌ Error fetching weather data!";
    }
}

function showError(error) {
    alert("❌ Location access denied!");
}
