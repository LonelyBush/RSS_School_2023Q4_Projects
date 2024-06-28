import {
  form, input, button, div,
} from '../../html_components/tags';
import { QueryParams } from '../../interfaces/interface';
import { GarageDom } from './garage';
import { randomHexColorCode } from '../../utils/utils';

export class Controls extends GarageDom {
  loadBlock(queryParams: QueryParams[]) {
    document.body.append(this.loadForms(queryParams).getNode());
  }

  loadForms(queryParams: QueryParams[]) {
    const formBlock = div('forms-block', this.loadCreateForm(queryParams), this.loadUpdateForm(queryParams));
    const controlsBlock = div('control-block', formBlock, this.loadControls(queryParams));
    return controlsBlock;
  }

  loadCreateForm(queryParams: QueryParams[]) {
    const textInput = input('text-input');
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('id', 'text-create');
    const colorInput = input('color-input');
    colorInput.setAttribute('type', 'color');
    colorInput.setAttribute('id', 'color-create');
    const submitInput = input('submit-input');
    submitInput.setAttribute('type', 'submit');
    submitInput.setAttribute('value', 'Create');
    submitInput.addListener('click', (e) => {
      e.preventDefault();
      const getGarageBlock = document.querySelector('.garage-block');
      getGarageBlock?.remove();
      const getColor = document.getElementById('color-create');
      const getText = document.getElementById('text-create');
      if (getColor instanceof HTMLInputElement && getText instanceof HTMLInputElement) {
        this.createCar(getText.value, getColor.value);
        getColor.value = '#000000';
        getText.value = '';
        this.LoadGarage(queryParams);
      }
    });
    const addCreateForm = form('create-car-form', textInput, colorInput, submitInput);
    return addCreateForm;
  }

  loadUpdateForm(queryParams: QueryParams[]) {
    const textInput = input('text-input');
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('id', 'text-update');
    const colorInput = input('color-input');
    colorInput.setAttribute('type', 'color');
    colorInput.setAttribute('id', 'color-update');
    const submitInput = input('submit-input');
    submitInput.setAttribute('type', 'submit');
    submitInput.setAttribute('value', 'Update');

    const addUpdateForm = form('update-car-form', textInput, colorInput, submitInput);
    const getArrOfChildren = addUpdateForm.getNode().childNodes;
    getArrOfChildren.forEach((element) => {
      if (element instanceof HTMLElement) element?.setAttribute('disabled', '');
    });
    submitInput.addListener('click', (e) => {
      const getUpdateCarForm = document.querySelector('.update-car-form');
      getUpdateCarForm?.childNodes.forEach((elem) => {
        if (elem instanceof HTMLElement) elem?.setAttribute('disabled', '');
      });
      e.preventDefault();
      const getGarageBlock = document.querySelector('.garage-block');
      getGarageBlock?.remove();
      if (e.target instanceof HTMLElement) {
        const getParentid = Number(e.target.parentElement?.id);
        const getColor = document.getElementById('color-update');
        const getText = document.getElementById('text-update');
        if (getColor instanceof HTMLInputElement && getText instanceof HTMLInputElement) {
          const name = getText.value;
          const color = getColor.value;
          const body = { name, color };
          this.response.updateCar(getParentid, body);
          this.LoadGarage(queryParams);
          const getParent = e.target.parentElement;
          const getChildrens = getParent?.childNodes;
          getChildrens?.forEach((elem) => {
            if (elem instanceof HTMLElement && elem instanceof HTMLInputElement) {
              if (elem.value !== 'Update') {
                elem.removeAttribute('value');
              }
            }
          });
        }
      }
    });
    return addUpdateForm;
  }

  loadControls(queryParams: QueryParams[]) {
    const raceBtn = button('control-btn', 'Race', () => {
      const getBtn = document.querySelectorAll('.control-btn');
      getBtn.forEach((elem) => {
        if (elem.id === 'race-btn') {
          elem.setAttribute('disabled', '');
        }
        if (elem.id === 'reset-btn') {
          elem.setAttribute('disabled', '');
        }
      });

      const getControlCarBtnsBlocks = document.querySelectorAll('.control-btns-block');
      getControlCarBtnsBlocks.forEach((elem) => {
        elem.childNodes.forEach((el) => {
          if (el instanceof HTMLElement) {
            if (el.textContent === 'A') {
              el.click();
            }
          }
        });
      });
    });
    const resetBtn = button('control-btn', 'Reset', () => {
      const getBtn = document.querySelectorAll('.control-btn');
      getBtn.forEach((elem) => {
        if (elem.id === 'race-btn') {
          elem.removeAttribute('disabled');
        }
        if (elem.id === 'reset-btn') {
          elem.setAttribute('disabled', '');
        }
      });
      const getControlCarBtnsBlocks = document.querySelectorAll('.control-btns-block');
      getControlCarBtnsBlocks.forEach((elem) => {
        elem.childNodes.forEach((el) => {
          if (el instanceof HTMLElement) {
            if (el.textContent === 'B') {
              el.click();
            }
          }
        });
      });
    });
    raceBtn.setAttribute('id', 'race-btn');
    resetBtn.setAttribute('id', 'reset-btn');
    const generateBtn = button('control-btn', 'Generate cars', () => {
      this.generateCars(queryParams);
    });
    const controlBtnBlock = div('control-btn-block', raceBtn, resetBtn, generateBtn);
    return controlBtnBlock;
  }

  generateCars = (queryParams: QueryParams[]) => {
    const getGarageBlock = document.querySelector('.garage-block');
    getGarageBlock?.remove();
    const carsName = ['Popel', 'Opel', 'LADA', 'Nissan', 'Toyota', 'Volkswagen', 'Mercedes', 'Porche', 'Tesla', 'Audi', 'ZAZ', 'Geely', 'Don Feng', 'Honda', 'Fiat'];
    const carsModel = ['Golf', 'Prius', 'Vesta', 'Equinox', 'CLS', 'GTR', 'Crown', 'Astra', 'Almera', 'Rio', 'S4', 'Largus', 'Polo', 'Megane', 'CRV'];
    for (let i = 0; i <= 100; i += 1) {
      const name = `${carsName[Math.floor(Math.random() * carsName.length)]} ${carsModel[Math.floor(Math.random() * carsModel.length)]}`;
      const color = randomHexColorCode();
      this.createCar(name, color);
    }
    setTimeout(() => this.LoadGarage(queryParams), 100);
  };
}
