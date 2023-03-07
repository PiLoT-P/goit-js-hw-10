import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputText = document.querySelector('#search-box');

function getContryName(event) {
    // console.log(event.target.value);
    let nameContry = event.target.value.trim();
    if (!nameContry) {
        return;
    }
    console.log(nameContry)
    fetchCountries('u').then(data => {
        console.log(data);
        console.log(data.length);
    }).catch(error => {
        console.log(error);
    });
    // if (data.length > 10) {
    //     console.log('big')
    // }
}

inputText.addEventListener('input', debounce(getContryName,300));
// fetchCountries('u').then(data => {
//     console.log(data);
//     console.log(data.length);
// }).catch(error => {
//     console.log(error);
// });

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.info('Cogito ergo sum');