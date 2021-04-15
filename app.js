//GET ELEMENT FROM HTML
const rateSpan = document.getElementById('rate')
const box = document.getElementById('box-part')
//Imports
import 'regenerator-runtime/runtime';
import axios from 'axios';
const arr = [
    { id: 'check', content: 'Project Managment' },
    { id: 'check', content: 'Marketing' },
    { id: 'check', content: 'CRM and Sales' },
    { id: 'check', content: 'Creative and Design' },
    { id: 'check', content: 'Software Development' },
    { id: 'check', content: 'Task Manager' },
    { id: 'check', content: 'Construction' },
    { id: 'check', content: 'HR and Recruiment' },
    { id: 'check', content: 'IT' },
    { id: 'check', content: '200+ Solutions' }
]
//Global vars
let queryLat;
let queryLng;
let baseUrl;
const apiKey = '41a87e2be2fd4652931a6be91078b2c1'
//Get location using built-in JS Func
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
const showPosition = (position) => {
    queryLat = position.coords.latitude
    queryLng = position.coords.longitude
    baseUrl = `https://api.opencagedata.com/geocode/v1/json?q=${queryLat}%2C${queryLng}&key=${apiKey}&pretty=1`
    axios(baseUrl)
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
const switchRates = (cout, baseRate, sign) => {
    if (cout.includes(baseRate)) {
        return sign
    }
    else {
        return null
    }
}
//Dynamicly outputing check boxes with func
const showCheckBoxes = () => {
    for (let i = 0; i < arr.length; i++) {
        var checkDiv = document.createElement('div')
        checkDiv.classList.add('check-div')
        checkDiv.id = 'check-div'
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = arr[i].id;

        var label = document.createElement('label')
        label.innerText = arr[i].content
        checkDiv.appendChild(checkbox)
        checkDiv.appendChild(label)
        box.appendChild(checkDiv)
        var x = document.querySelectorAll('#check')
        x[i].addEventListener('click', () => {
            if (x[i].checked) {
                x[i].parentElement.classList.add('checked')
            }
            else {
                x[i].parentElement.classList.remove('checked')
            }
        })
    }

}

//Event listeners

//Call the getLocation
getLocation()
showCheckBoxes()