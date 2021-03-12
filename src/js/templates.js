import { v4 as uuidv4 } from 'uuid';

export const generate = (value) => {
  return `
  <li class="workplace__item animated" data-key="${uuidv4()}">
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

export const message = {
  add: 'task added!',
  remove: 'task removed',
};
