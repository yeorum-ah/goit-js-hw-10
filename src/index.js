import { fetchBreeds, fetchCatByBreed } from '/src/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const ref = {
  selector: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
const { selector, catInfo, loader, error } = ref;

function showLoader() {
  loader.style.display = 'block';
  selector.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');
}

function hideLoader() {
  loader.style.display = 'none';
}

error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let arrayId = [];
showLoader();

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrayId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selector,
      data: arrayId,
    });
    hideLoader();
  })
  .catch(fetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  showLoader();
  selector.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      hideLoader();
      selector.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(fetchError);
}

function fetchError(error) {
  selector.classList.remove('is-hidden');
  hideLoader();
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}
