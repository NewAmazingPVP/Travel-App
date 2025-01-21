const map = L.map("map", { zoomControl: true }).fitWorld();

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
}).addTo(map);

const countryName = document.getElementById("countryName");
const capitalCity = document.getElementById("capitalCity");

let clickedMarker = null;

// geojson layer
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

fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
    .then((response) => response.json())
    .then((data) => {
        geoJsonLayer.addData(data);
        map.fitBounds(geoJsonLayer.getBounds()); // Center map to fit GeoJSON data
    })
    .catch((err) => console.error("Failed to load GeoJSON data:", err));

window.addEventListener("resize", () => {
    map.invalidateSize();
});
