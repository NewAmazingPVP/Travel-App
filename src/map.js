const map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
}).addTo(map);

const countryName = document.getElementById("countryName");
const capitalCity = document.getElementById("capitalCity");

let clickedMarker = null;

map.on("click", async (e) => {
    const {lat, lng} = e.latlng;

    if (clickedMarker) {
        map.removeLayer(clickedMarker);
        clickedMarker = null;
    }
    clickedMarker = L.marker([lat, lng]).addTo(map);

    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    try {
        const response = await fetch(geocodeUrl);
        const reverseGeo = await response.json();
        const foundCountry = reverseGeo.address.country;
        const restUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(foundCountry)}?fullText=true`;
        const response2 = await fetch(restUrl);
        const countryDetails = await response2.json();
        const detail = countryDetails[0];
        const name = detail.name?.official || foundCountry;
        const capital = detail.capital[0];

        countryName.textContent = name;
        capitalCity.textContent = `Capital: ${capital}`;

        localStorage.setItem("chosenCountry", name);
        localStorage.setItem("pickedCapital", capital);
    } catch (err) {
    }
});
