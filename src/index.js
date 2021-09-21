import './styles.css';
import fetchCountries from './fetchCountries.js';
import countryListItemsTemplate from './template/countryListItem.hbs';
import countriesListTemplate from './template/countryList.hbs';
import { alert, notice, info, success, error } from '../node_modules/@pnotify/core';
import debounce from '../node_modules/lodash.debounce';

const refs = {
  searchForm: document.querySelector('#search-form'),
  countryList: document.querySelector('#country-list'),
  searchInput: document.querySelector('.search__input'),
};

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
});

refs.searchForm.addEventListener(
  'input',
  debounce(e => {
    searchFormInputHandler(e);
  }, 500),
);

function searchFormInputHandler(e) {
  const searchQuery = e.target.value;

  clearListItems();

  fetchCountries(searchQuery).then(data => {
    const markup = buildListItemMarkup(data);
    const renderCountriesList = buildCountriesList(data);
    if (!data) {
      return;
    } else if (data.length > 10) {
      error({
        title: 'Oh No!',
        text: 'Too many matches found. Please enter a more specific query',
      });
    } else if (data.length >= 2 && data.length <= 10) {
      insertListItem(renderCountriesList);
    } else if (data.length === 1) {
      insertListItem(markup);
    } else {
      alert('Ничего не найдено. Корректно введите запрос');
    }
  });
}

function insertListItem(items) {
  refs.countryList.insertAdjacentHTML('beforeend', items);
}

function buildCountriesList(items) {
  return countriesListTemplate(items);
}

function buildListItemMarkup(items) {
  return countryListItemsTemplate(items);
}

function clearListItems() {
  refs.countryList.innerHTML = '';
}