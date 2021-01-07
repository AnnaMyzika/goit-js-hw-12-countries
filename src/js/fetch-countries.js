import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import list from '../templates/list.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';


const searchImput = document.querySelector(".input");
searchImput.addEventListener("input", debounce(search, 1500));

function search(e) {
    
    const value = e.target.value

    if (!value) {
        error({
  title: 'Oh No!',
  text: 'Введите текст.'
        });
        return;
    }

    fetch(`https://restcountries.eu/rest/v2/name/${value}`)
         .then(response => {
    return response.json();
  })
  .then(data => {
      console.log(data)
      if (data.length > 10) {
         error({
            title: 'Oh No!',
            text: 'Something terrible happened.'
         });
      }
      
      else if (data.length >= 2 && data.length <= 10) {
          const listCountries = document.querySelector(".countries");
          listCountries.insertAdjacentHTML('beforeend', list(data))

      }

      else if (data.length === 1) {

      }

      else {
          error({
            title: 'Oh No!',
            text: 'Something terrible happened.'
         });
      }
  })
   
};



