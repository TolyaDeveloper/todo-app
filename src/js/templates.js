import { v4 as uuidv4 } from 'uuid';
import { Todo } from './classes/Todo';

export const todo = (value) => {
  const id = uuidv4();

  return {
    generate() {
      return `
      <li class="workplace__item animated" data-key="${id}">
        <label>
          <input class="workplace__checkbox" type="checkbox" />
          <p class="workplace__item-text">${value}</p>
          <button class="workplace__item-delete" type="button" aria-label="delete current todo">
          <img class="workplace__item-image" src="images/dist/icons/delete.svg"  alt="delete icon"/>
          </button>
        </label>
      </li>
      `;
    },
    data() {
      return new Todo(id, false, value);
    },
  };
};

export const render = (key, pressed, value) => {
  return !pressed
    ? `
      <li class="workplace__item" data-key="${key}">
        <label>
          <input class="workplace__checkbox" type="checkbox" />
          <span class="workplace__item-text">${value}</span>
          <button class="workplace__item-delete" type="button" aria-label="delete current todo">
          <img class="workplace__item-image" src="images/dist/icons/delete.svg"  alt="delete icon"/>
          </button>
        </label>
      </li>
      `
    : `<li class="workplace__item" data-key="${key}">
        <label>
          <input class="workplace__checkbox" type="checkbox" checked/>
          <span class="workplace__item-text">${value}</span>
          <button class="workplace__item-delete" type="button" aria-label="delete current todo">
          <img class="workplace__item-image" src="images/dist/icons/delete.svg"  alt="delete icon"/>
          </button>
        </label>
      </li>
      `;
};

export const message = {
  add: 'task added!',
  remove: 'task removed',
  notEmpty: "the field can't be empty",
};
