import {
  addActive,
  removeActive,
  input,
  activatePopup,
  setLocal,
  getLocal,
} from '../utils';
import { todo, message, render } from '../templates';

const form = document.querySelector('.form');

const modal = document.querySelector('[data-modal="todo"]');
const modalConfirm = document.querySelector('[data-modal="confirm"]');
const closers = document.querySelectorAll('[data-close-modal]');
const closeAll = document.querySelector('[data-close-all]');

const btn = document.querySelector('.workplace__add');
const parent = document.querySelector('.workplace__inner');

const store = [];

if (getLocal('tasks')) {
  JSON.parse(getLocal('tasks')).forEach(({ key, pressed, value }) => {
    store.push({ key, pressed, value });
    parent.insertAdjacentHTML('afterbegin', render(key, pressed, value));
  });
}

btn.addEventListener('click', () => {
  addActive(modal);
  input('.form__input').focus();
});

closers.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (input('.form__input').getText()) {
      addActive(modal);
      addActive(modalConfirm);
    } else {
      removeActive(modal);
    }

    if (e.target.closest('.modal:not([data-modal="todo"])')) {
      removeActive(modalConfirm);
    }
  });
});

closeAll.addEventListener('click', () => {
  document.querySelectorAll('.modal').forEach((item) => {
    removeActive(item);
  });

  form.reset();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input('.form__input').getText();
  const utils = todo(text);

  if (text) {
    parent.insertAdjacentHTML('afterbegin', utils.generate());
    store.push(utils.data());
    setLocal('tasks', JSON.stringify(store));
    removeActive(modal);
    form.reset();
    activatePopup('.popup-badge', message.add);
  } else {
    activatePopup('.popup-badge', message.notEmpty);
  }
});

parent.addEventListener('click', (e) => {
  const t = e.target;
  const item = t.closest('.workplace__item');

  if (t.matches('.workplace__item-image')) {
    const id = item.dataset.key;
    const itemNum = store.findIndex((item) => item.key === id);
    store.splice(itemNum, 1);
    setLocal('tasks', JSON.stringify(store));

    item.remove();
    activatePopup('.popup-badge', message.remove);
  }
});
