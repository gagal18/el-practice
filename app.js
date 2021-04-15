//GET ELEMENT FROM HTML
const rateSpan = document.getElementById('rate')
const box = document.getElementById('box-part')
//Imports
import 'regenerator-runtime/runtime';
import axios from 'axios';
const arr = [
    { color: 'blue', content: 'Project Managment' },
    { color: 'blue', content: 'Marketing' },
    { color: 'blue', content: 'CRM and Sales' },
    { color: 'blue', content: 'Creative and Design' },
    { color: 'blue', content: 'Software Development' },
    { color: 'blue', content: 'Task Manager' },
    { color: 'blue', content: 'Construction' },
    { color: 'blue', content: 'HR and Recruiment' },
    { color: 'blue', content: 'IT' },
    { color: 'blue', content: '200+ Solutions' }
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
                console.log(rateEu)
            }
            if (rateUk) {
                rateSpan.textContent = rateUk
                console.log(rateUk)
            }
            if (rateUs) {
                rateSpan.textContent = rateUs
                console.log(rateUs)
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
const boxChecked = () => {
    if (checkbox.checked == true) {
        alert('PRESSED')
    }
}
const switchRates = (cout, baseRate, sign) => {
    if (cout.includes(baseRate)) {
        return sign
    }
    else {
        return null
    }
}

const showCheckBoxes = () => {
    for (let i = 0; i < arr.length; i++) {
        var checkDiv = document.createElement('div')
        checkDiv.classList.add('check-div')
        checkDiv.id = 'check-div'
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = arr[i].color;

        var label = document.createElement('label')
        label.innerText = arr[i].content
        checkDiv.appendChild(checkbox)
        checkDiv.appendChild(label)
        box.appendChild(checkDiv)
        var x = document.querySelectorAll('#blue')
        x[i].addEventListener('click' , ()=>{
            if(x[i].checked){
                x[i].parentElement.classList.add('checked')
            }
            else{
                x[i].parentElement.classList.remove('checked')
            }
        })
        console.log(x[i])        
    }

}

//Event listeners

//Call the getLocation
getLocation()
showCheckBoxes()