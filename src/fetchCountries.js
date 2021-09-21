export default function fetchCountries (name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
      if (name) {
        return response.json();
      } else {
        return;
      }
    })
    .catch(error => console.log(error));
}