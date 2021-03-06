import { remove } from 'lodash';
import cardImgTpl from './img-card.hbs';
import FetchService from './js/fetch';
import onClickImage from './js/modal';

const refs = {
    searchValue: document.querySelector('.search-form'),
    searchInputValue:document.querySelector('input'),
    galleryBlock: document.querySelector('.gallery'),
    btn: document.querySelector('button'),
};

const fetchService = new FetchService();

// refs.searchInputValue.addEventListener('blur', onSearchBlur);
refs.searchValue.addEventListener('submit', onSearchSubmit);
refs.btn.addEventListener('click', onSearchMore);
refs.galleryBlock.addEventListener('click', onClickImage);

function onSearchSubmit(ev) {
    ev.preventDefault();

    fetchService.query = ev.currentTarget.elements.query.value;

    if (fetchService.query != '') {
        fetchService.resetPage();
        clearPage();
        fetchService.fetchImg().then(renderGallery); 
        return;
    }
    clearPage();
    removeBtn();
    return
     
}

// function onSearchBlur(ev) {
//     fetchService.query = ev.currentTarget.value;
    
//      if (fetchService.query === '') {
//         clearPage();
//         removeBtn();
//         return;
//     }
//     fetchService.resetPage();
//     clearPage();
//     fetchService.fetchImg().then(renderGallery);  
// }



function onSearchMore() {
    fetchService.fetchImg().then(renderGallery);
    
    setTimeout(
        function() {
            const element = document.getElementById('1');
    element.scrollIntoView({
behavior: 'smooth',
  block: 'end',
});
    },1000)

}

function renderGallery(hits) {

    if (hits === undefined) {
        clearPage();
        removeBtn();
        refs.galleryBlock.innerHTML = "<p style='color:red'>ALARM: Nothing has been found. Please enter a more specific query!</p>";
        return
    }

    addBtn();
    const gallery = cardImgTpl(hits);
    // console.log('gallery', gallery);
    refs.galleryBlock.insertAdjacentHTML('beforeend', gallery);  
}

function clearPage() {
    refs.galleryBlock.innerHTML = '';
}

function addBtn() {
    refs.btn.classList.remove('none');
    }

function removeBtn() {
        refs.btn.classList.add('none');
    }