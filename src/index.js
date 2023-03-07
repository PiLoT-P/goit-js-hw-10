import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputText = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');

function getContryName(event) {
    let nameContry = event.target.value.trim();
    if (!nameContry) {
        listCountry.innerHTML = '';
        return;
    }
    console.log(nameContry)
    fetchCountries(nameContry).then(data => {
        console.log(data);
        let lengthRequest = data.length;
        if (lengthRequest > 10) {
            Notiflix.Notify.info('Cogito ergo sum');
            return;
        }
        if (lengthRequest > 2 && lengthRequest < 10) {
            printCountryMor(data);
            return;
        }
        printCounryOne(data);
    }).catch(error => {
        console.log(error);
        Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function printCountryMor(countrys) {
    const nameCon = countrys.map((country) => {
        return `
            <li class = 'item'>
                <img src="${country.flags.svg}" width ='25' height = '25'alt="">
                <span class = 'item-text'>${country.name.official}</span>
            </li>
        `;
    })
        .join('');
    listCountry.innerHTML = nameCon;
    console.log('this function more');
    console.log(nameCon);
}

function printCounryOne(countrys) {
    const nameCon = countrys.map((country) => {
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
    console.log('this function one');
    console.log(nameCon);
}

inputText.addEventListener('input', debounce(getContryName,DEBOUNCE_DELAY));
