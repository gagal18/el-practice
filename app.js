//GET ELEMENT FROM HTML
const rateSpan = document.getElementById('rate')
//Imports
import 'regenerator-runtime/runtime';
import axios from 'axios';
//Global vars
let queryLat;
let queryLng;
let baseUrl;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
const showPosition = (position) => {
    queryLat = position.coords.latitude
    queryLng = position.coords.longitude
    const apiKey = '41a87e2be2fd4652931a6be91078b2c1'
    baseUrl = `https://api.opencagedata.com/geocode/v1/json?q=${queryLat}%2C${queryLng}&key=${apiKey}&pretty=1`
    axios.get(baseUrl)
        .then(res => {
            const timeZoneCC = res.data.results[0].components.country_code;
            const timeZone = res.data.results[0].components.continent;
            let rateEu = switchRates(timeZone, 'Europe', '€')
            let rateUk = switchRates(timeZoneCC, 'gb', '£')
            let rateUs = switchRates(timeZoneCC, 'us', '$')
            if (rateEu) {
                rateSpan.textContent = rateEu
            }
            if (rateUk) {
                rateSpan.textContent = rateUk
            }
            if (rateUs) {
                rateSpan.textContent = rateUs
            }
            else if (!rateUs && !rateUk && !rateEu) {
                rateSpan.textContent = '$'
            }
        })
        .catch(err => {
            console.log(err)
        })


}
//Functions 
function switchRates(cout, baseRate, sign) {
    if (cout.includes(baseRate)) {
        return sign
    }
    else {
        return null
    }
}


getLocation()