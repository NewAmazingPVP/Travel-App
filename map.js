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

/*
// GeoJSON layer
const geoJsonLayer = L.geoJSON(null, {
    style: {
        color: "#3388ff",
        weight: 1,
        fillColor: "#6baed6",
        fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
        layer.on("mouseover", (e) => {
            layer.setStyle({
                color: "#0056b3",
                fillColor: "#1d91c0",
                fillOpacity: 0.7,
            });
        });
        
        layer.on("mouseout", (e) => {
            geoJsonLayer.resetStyle(e.target);
        });

        layer.on("click", async (e) => {
            const { name } = feature.properties;

            if (clickedMarker) {
                map.removeLayer(clickedMarker);
                clickedMarker = null;
            }
            clickedMarker = L.marker(e.latlng).addTo(map);

            const restUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`;
            try {
                const response = await fetch(restUrl);
                const countryDetails = await response.json();
                const detail = countryDetails[0];
                const capital = detail.capital[0];

                countryName.textContent = name;
                capitalCity.textContent = `Capital: ${capital}`;

                localStorage.setItem("chosenCountry", name);
                localStorage.setItem("pickedCapital", capital);
            } catch (err) {
                console.error("Failed to fetch country details:", err);
            }
        });
    }
}).addTo(map);

fetch("https://geojson-maps.ash.ms/world-110m.geojson")
    .then((response) => response.json())
    .then((data) => {
        geoJsonLayer.addData(data);
    })
    .catch((err) => console.error("Failed to load GeoJSON data:", err));
*/



