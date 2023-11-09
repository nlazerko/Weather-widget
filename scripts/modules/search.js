import { startWidget } from './widgetService.js';

export const cityServiceSearch = (widget) => {
  const button = document.querySelector('.widget__change-city');

  button.addEventListener('click', () => {
    const form = document.createElement('form');
    form.classList.add('widget__form');
    const input = document.createElement('input');
    form.classList.add('widget__input');
    input.name = 'city';
    input.type = 'search';
    input.placeholder = 'Введите город';

    form.append(input);
    widget.append(form);

    input.focus();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      widget.textContent = '';

      await startWidget(input.value, widget);
      cityServiceSearch(widget);
    });
  });
};
