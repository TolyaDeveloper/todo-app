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

const modals = document.querySelectorAll('[data-modal]');
const openers = document.querySelectorAll('[data-open]');
const closers = document.querySelectorAll('[data-close]');
const closeAll = document.querySelector('[data-closeAll]');

const parent = document.querySelector('.workplace__inner');

const store = [];
let modalsOpened = [];

openers.forEach((item) => {
  item.addEventListener('click', () => {
    const name = item.dataset.open;
    let curr = [...modals];

    curr = curr.filter((item) => item.dataset.modal === name);
    modalsOpened = [...curr];

    addActive(modalsOpened[modalsOpened.length - 1]);

    if (modalsOpened[modalsOpened.length - 1].dataset.modal === 'todo') {
      input('.form__input').focus();
    }
  });
});

closers.forEach((item) => {
  item.addEventListener('click', () => {
    const closestKey = item.closest('[data-modal]').dataset.modal;
    let text;

    if (closestKey === 'todo') {
      text = input('.form__input').getText();
    }

    if (text) {
      addActive(modalConfirm);
      modalsOpened.push(modalConfirm);
      input('.form__input').blur();
    } else {
      removeActive(modalsOpened[modalsOpened.length - 1]);
      modalsOpened.pop();
    }
    console.log(modalsOpened);
  });
});

if (getLocal('tasks')) {
  JSON.parse(getLocal('tasks')).forEach(({ key, pressed, value }) => {
    store.push({ key, pressed, value });
    parent.insertAdjacentHTML('afterbegin', render(key, pressed, value));
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input('.form__input').getText();
  const utils = todo(text);

  if (text) {
    parent.insertAdjacentHTML('afterbegin', utils.generate());
    store.push(utils.data());
    setLocal('tasks', JSON.stringify(store));
    removeActive(modalsOpened[0]);
    form.reset();
    modalsOpened = [];
    input('.form__input').blur();
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

  if (t.matches('.workplace__item-text') && t.previousElementSibling.checked) {
    const id = item.dataset.key;
    const itemNum = store.findIndex((item) => item.key === id);
    store[itemNum].pressed = false;
    setLocal('tasks', JSON.stringify(store));
  } else if (
    t.matches('.workplace__item-text') &&
    !t.previousElementSibling.checked
  ) {
    const id = item.dataset.key;
    const itemNum = store.findIndex((item) => item.key === id);
    store[itemNum].pressed = true;
    setLocal('tasks', JSON.stringify(store));
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'KeyT') {
    if (modalsOpened.length === 0) {
      addActive(modal);
      modalsOpened.push(modal);
      input('.form__input').focus();
    }
    console.log(modalsOpened);
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Escape' && modalsOpened.length !== 0) {
    if (modalsOpened[modalsOpened.length - 1].dataset.modal === 'confirm') {
      removeActive(modalsOpened[modalsOpened.length - 1]);
      modalsOpened.pop();
    } else if (
      input('.form__input').getText() &&
      modalsOpened[0].dataset.modal === 'todo'
    ) {
      addActive(modalConfirm);
      modalsOpened.push(modalConfirm);
      input('.form__input').blur();
    } else {
      removeActive(modalsOpened[modalsOpened.length - 1]);
      modalsOpened = [];
      input('.form__input').blur();
    }

    console.log(modalsOpened);
  }
});

closeAll.addEventListener('click', () => {
  modalsOpened.forEach((item) => removeActive(item));
  modalsOpened = [];
  form.reset();
});
