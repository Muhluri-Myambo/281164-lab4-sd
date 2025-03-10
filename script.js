document.getElementById('fetch-country').addEventListener('click', async function() {
  const CN = document.getElementById('country-input').value.trim(); //used CN for the name of the country.

  if (CN === '') {
      window.alert("enter country name mf!");
      return;
  }

  try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${CN}?fullText=true`);
      if (!response.ok) {
          throw new Error('ay, such a country doesnt exists broda.');
      }

      const data = await response.json();
      const country = data[0];

      document.getElementById('capital').textContent = `Capital: ${ country.capital[0]}`;
      document.getElementById('population').textContent = `Population: ${country.population}`;
      document.getElementById('region').textContent = `Region: ${country.region}`;
      document.getElementById('flag').innerHTML = `<img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="100">`;

      // here BCs is bordering countries and bCode is the bordering country code.
      const BCs = document.getElementById('border-list');
      BCs.innerHTML="";

      if (country.borders && country.borders.length > 0) {
          for (const bCode of country.borders) {
              const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${bCode}`);
              if (borderResponse.ok) {
                  const borderData = await borderResponse.json();
                  const borderCountry = borderData[0];
                  const listItem = document.createElement('ul');
                  listItem.innerHTML = `
                      <img src="${borderCountry.flags.svg}" \t "${borderCountry.name.common}" width="90">
                      ${borderCountry.name.common}
                  `;
                  BCs.appendChild(listItem);
              }
          }
      } else {
          window.alert("sorry baba, no bordering countries found");
      }

  } catch (error) {
      alert(error.message);
      console.error(error);
  }
});
