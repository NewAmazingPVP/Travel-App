const country = document.getElementById("country");
const capital = document.getElementById("capital");
const countryBox = document.getElementById("countryBox");
const chosenCountry = localStorage.getItem("chosenCountry");
const pickedCapital = localStorage.getItem("pickedCapital");

if (chosenCountry || countryBox) {
    country.textContent = chosenCountry;
    capital.textContent = pickedCapital;

    fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(chosenCountry)}?fullText=true`
    )
        .then((response) => response.json())
        .then((data) => {
            const detail = data[0];
            const name = detail.name?.official || chosenCountry;
            const area = detail.region;
            const subArea = detail.subregion;
            const population = detail.population?.toLocaleString();
            const mainCity = detail.capital[0];
            const money = Object.keys(detail.currencies).join(", ");
            const timezones = detail.timezones.join(", ");

            countryBox.innerHTML = `
        <strong>Official Name:</strong> ${name}<br />
        <strong>Capital:</strong> ${mainCity}<br />
        <strong>Region:</strong> ${area}<br />
        <strong>Subregion:</strong> ${subArea}<br />
        <strong>Population:</strong> ${population}<br />
        <strong>Currencies:</strong> ${money}<br />
        <strong>Timezones:</strong> ${timezones}
      `;
        })
}
