import './css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const getName = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');


//функції івенту виклику запита, і виводу даних
function getContryName(event) {
    let nameContry = event.target.value.trim();
    if (!nameContry) {
        listCountry.innerHTML = '';
        return;
    }
    fetchCountries(nameContry).then(data => {
        let lengthJSON = data.length;
        console.log(lengthJSON);
        if (lengthJSON > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        }
        if (lengthJSON >= 2 && lengthJSON <= 10) {
            printCountryMor(data);
            return;
        }
        printCounryOne(data);
    }).catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}


// Створення списку, де більше 1 країни і менше 11
function printCountryMor(countries) {
    const nameCon = countries.map((country) => {
        return `
            <li class = 'item'>
                <img src="${country.flags.svg}" width ='25' height = '25'alt="">
                <span class = 'item-text'>${country.name.official}</span>
            </li>
        `;
    })
        .join('');
    listCountry.innerHTML = nameCon;
}


// створення списку, де одна країна
function printCounryOne(countries) {
    const nameCon = countries.map((country) => {
        const language = Object.values(country.languages);
        return `
            <li>
                <img src="${country.flags.svg}" width ='25' height = '25'alt="">
                <span class = 'item-text'>${country.name.official}</span>
                <p>Capital:${country.capital}</p>
                <p>Population:${country.population}</p>
                <p>Languages:${language}</p>
            </li>
        `;
    })
        .join('');
    listCountry.innerHTML = nameCon;
}


getName.addEventListener('input', debounce(getContryName,DEBOUNCE_DELAY));
