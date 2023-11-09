export const cityServiceSearch = (app) => {
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
    app.append(form);

    input.focus();
  });
};
