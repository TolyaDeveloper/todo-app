import { v4 as uuidv4 } from 'uuid';

const modal = document.querySelector('.modal');
const closers = document.querySelectorAll('[data-close]');
const btn = document.querySelector('.workplace__add');
const textarea = document.querySelector('.form__textarea');
const parent = document.querySelector('.workplace__inner');

const generate = (value) => {
  return `
  <li class="workplace__item" data-key="${uuidv4()}">
    <label>
      <input class="workplace__checkbox" type="checkbox" />
      <p class="workplace__item-text">${value}</p>
      <button class="workplace__item-delete" type="button" aria-label="delete current todo">
        <img class="workplace__item-image" src="images/dist/icons/delete.svg"  alt="delete icon"/>
      </button>
    </label>
  </li>
  `;
};

btn.addEventListener('click', () => {
  modal.classList.add('active');
  textarea.focus();
});

closers.forEach((item) => {
  item.addEventListener('click', () => {
    modal.classList.remove('active');
  });
});
