import { after, debounce, update } from 'lodash';
import countryTpl from './country.hbs'
import countryListTpl from './countryList.hbs'

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    input: document.querySelector('input'),
    container: document.querySelector('.container'),
    mistake: document.querySelector('.message-mistake'),
}


// const r = fetch('https://restcountries.com/v2/name/poly').then(responce => {
    
//     return responce.json();
// })
//     .then(country => {
//         // console.log(country.length);

//         if (country.length > 10){
//           return fetcherror('Too many matches found. Please enter a more specific query!');}
       
//         if (country.status === 404){
//             return fetcherror(404);
//         }
//         if (country.length === 1){
//             const murkup = countryTpl(country);
//             refs.searchForm.insertAdjacentHTML('afterEnd', murkup);
//         }
//         if (country.length > 1 || country.length <= 10) {
//             // console.log('object',country);
//             const list = countryList({country})
//             refs.searchForm.insertAdjacentHTML('afterEnd', list);
//             // return console.log('country.length:',country.length);
//       }    
//     })

// function fetcherror(error) {
//     console.log(error);
// };

let delayEvent = debounce(inputValue,500)
refs.input.addEventListener('input', delayEvent)
function inputValue(el) {
    // console.log(el.currentTarget.value);
    let value = el.target.value;
    
    fetchCountry(`${value}`)
        .then(countries => {

            console.log('country',countries)
            if (countries.message==='Page Not Found') {
                refs.mistake.classList.remove('none');
                refs.mistake.innerHTML = 'Please enter a more specific query!';
                clearWindow()
            }
     
        if (countries.length > 10)
        {
            refs.mistake.classList.remove('none');
            refs.mistake.innerHTML = 'Too many matches found. Please enter a more specific query!';
            clearWindow()
            return error('Too many matches found. Please enter a more specific query!');
        }
            if (countries.status === 404) {
                refs.mistake.classList.remove('none');
                refs.mistake.innerHTML = 'No country has been found. Please enter a more specific query!';
                clearWindow()
            return error('No country has been found. Please enter a more specific query!');
        }
            if (countries.length === 1) {
            refs.mistake.classList.add('none');
            return renderCountry(countries)
        }
            if (countries.length > 1 || countries.length <= 10) {
            refs.mistake.classList.add('none');
            renderCountryList(countries)
        }
      })
}


function fetchCountry(name) {
    return fetch(`https://restcountries.com/v2/name/${name}`)
        .then(responce => {
            return responce.json();
        },
        );
};

function renderCountry(country) {
    clearWindow();
    const murkup = countryTpl(country);
    refs.container.insertAdjacentHTML('afterbegin', murkup);
}

function renderCountryList(country) {
    clearWindow();
    const countryList = countryListTpl({country})
    refs.container.insertAdjacentHTML('afterbegin', countryList);   
}

function error(err) {
    if (err.status === 404) {
        console.log('error', 404)  
    };
}
  
function error(err) {
    console.log(err);
}
      
function clearWindow() {
    document.querySelector('.container').innerHTML = '';
}