import { fetchBreeds, fetchCatByBreed } from '/src/cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('select');
const loader = document.querySelector('.loader');

select.addEventListener('change', onSelectChange);

fetchBreeds()
  .then(data => {
    breedSelect.innerHTML = createMarkupOption(data);
  })
  .catch(err => promisError(err));

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function onSelectChange(e) {
  const id = e.currentTarget.value;
  showLoader();
  catInfo.classList.add('cat-info');
  fetchCatByBreed(id)
    .then(data => {
      catInfo.innerHTML = createMarkupInfo(data);
      hideLoader();
    })
    .catch(err => {
      promisError(err);
      hideLoader();
    });
}

function createMarkupOption(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createMarkupInfo(arr) {
  return arr
    .map(
      ({
        url,
        breeds: {
          0: { alt_names = '', description },
        },
      }) => `<div class="markup">
    <img src="${url}" alt="cat" width="400" > 
    <div class="markup-designe">
       <h2> ${alt_names} </h2>
    <p>${description}</p>
      </div>
    </div>`
    )
    .join('');
}

function promisError(srt) {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
