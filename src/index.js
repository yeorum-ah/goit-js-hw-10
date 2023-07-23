import { fetchBreeds, fetchCatByBreed } from '/src/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
new SlimSelect({
  select: '#slim-select',
});

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('select');
const loader = document.querySelector('.loader');

select.classList.remove('breed-select');
select.addEventListener('change', onSelectChange);

fetchBreeds()
  .then(data => {
    breedSelect.innerHTML = createMarkupOption(data);
  })
  .catch(err => promisError(err));

function onSelectChange(e) {
  const id = e.currentTarget.value;
  loader.classList.remove('loader');
  select.classList.add('breed-select');
  catInfo.classList.add('cat-info');
  fetchCatByBreed(id)
    .then(data => {
      catInfo.innerHTML = createMarkupInfo(data);
    })
    .catch(err => promisError(err));
}

function createMarkupOption(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createMarkupInfo(arr) {
  loader.classList.add('loader');
  select.classList.remove('breed-select');
  catInfo.classList.remove('cat-info');
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

  loader.classList.replace('loader');
}
