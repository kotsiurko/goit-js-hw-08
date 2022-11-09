import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const FORM_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onInputEnter, 500));
formEl.addEventListener('submit', onInputSubmit);

function onInputEnter(event) {
  let savedDate = JSON.parse(localStorage.getItem(FORM_KEY)) ?? {};
  const { name, value } = event.target;

  savedDate = {
    ...savedDate,
    [name]: value,
  };

  localStorage.setItem(FORM_KEY, JSON.stringify(savedDate));
}

function renderData() {
  let dataToRender = JSON.parse(localStorage.getItem(FORM_KEY)) ?? {};

  const inputNames = Object.keys(dataToRender);
  // console.log(inputNames);
  inputNames.forEach(inputName => {
    let input = formEl.elements[inputName];
    let valueKey = 'value';

    input[valueKey] = dataToRender[inputName];
  });
}
renderData();

function onInputSubmit(event) {
  event.preventDefault();

  let finalData = {};
  const formData = new FormData(formEl);
  for (const [name, value] of formData.entries()) {
    if (!value) {
      return;
    }
    finalData[name] = value;
  }

  localStorage.removeItem(FORM_KEY);
  console.log(finalData);
  formEl.reset();
}
