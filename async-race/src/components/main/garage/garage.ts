/* eslint-disable no-alert */
import { Cars, Data, QueryParams } from '../../interfaces/interface';
import {
  p, h1, div, button, img, sprite,
} from '../../html_components/tags';

import './garage.css';
import { ApiClient } from '../../api/api_client';

const carIcon = require('../../../assets/icons/car_icon.svg');

const finishIcon = require('../../../assets/img/finish_flag.png');

export class GarageDom {
  protected response: ApiClient;

  constructor() {
    this.response = new ApiClient();
  }

  LoadGarage = async (queryParams: QueryParams[]) => {
    let winner: number = 0;
    const data: Data = await this.response.getCars(queryParams);
    const getQueryPageVal = queryParams[0].value;
    const garageTitle = h1('car-title', `Garage (${data.count || 0})`);
    const pagesTitle = p('car-title', `Page #${getQueryPageVal}`);
    const paginationNextBtn = button('pagination-btn', 'Next', () => {
      this.paginationNext(queryParams);
    });
    const paginationBackBtn = button('pagination-btn', 'Back', () => {
      this.paginationBack(queryParams);
    });
    if (getQueryPageVal === 1) {
      paginationBackBtn.setAttribute('disabled', '');
    } else {
      paginationBackBtn.removeAttribute('disabled');
    }
    const paginationBlock = div('pagination-block', paginationBackBtn, paginationNextBtn);
    const mainGarageBlock = div('garage-block', garageTitle, pagesTitle);
    if (data.count === undefined && data.data === undefined) {
      alert('The number of cars in garage is zero !');
    } else {
      data.data.forEach((el: Cars) => {
        const carTitle = p('car-title', `${el.name}`);
        carTitle.setAttribute('id', `title-${el.id}`);
        const carSvg = sprite('car-icon', `${carIcon}#car_icon`);
        carSvg.setAttribute('fill', `${el.color}`);
        carSvg.setAttribute('id', `car-${el.id}`);
        const finishFlag = img('finish-icon', finishIcon);

        const removeBtn = button('control-btn', 'Remove', async (e) => {
          const getGarageBlock = document.querySelector('.garage-block');
          getGarageBlock?.remove();
          if (e.target instanceof HTMLElement) {
            const getParentBlock = e.target.parentNode?.parentElement?.parentElement;
            const getId = Number(getParentBlock?.id);
            await this.response.deleteCar(getId);
            await this.response.deleteWinner(getId);
            this.LoadGarage(queryParams);
            const getUpdateForm = document.querySelector('.update-car-form');
            getUpdateForm?.childNodes?.forEach((elem) => {
              if (elem instanceof HTMLElement && elem instanceof HTMLInputElement) {
                if (elem.value !== 'Update') elem.removeAttribute('value');
                elem.setAttribute('disabled', '');
              }
            });
          }
        });
        const selectBtn = button('control-btn', 'Select', (e) => {
          this.selectCar(e);
        });
        let stopBtn = false;
        const engineStart = button('engine-btn', 'A', async (e) => {
          winner = 0;
          let checkAnimation = true;
          if (e.target instanceof HTMLElement) {
            e.target.setAttribute('disabled', '');
            const getParentBlock = e.target.parentNode?.parentElement?.parentElement;
            const getId = Number(getParentBlock?.id);
            const getStop = document.getElementById(`stop-B-${getId}`);
            getStop?.removeAttribute('disabled');
            const getCarIcon = document.getElementById(`car-${getId}`);
            const getData = await this.response.startEngine([{ key: 'id', value: getId }, { key: 'status', value: 'started' }]);
            const getAnimationSpeed = ((getData.distance / getData.velocity));
            const getRaceBtn = document.getElementById('race-btn');
            const getTitleId = document.getElementById(`title-${getId}`);
            if (getCarIcon != null && getCarIcon instanceof SVGElement
               && getRaceBtn instanceof HTMLButtonElement) {
              const start = performance.now();
              const loop = async (time: number) => {
                let timeFraction = (time - start) / getAnimationSpeed;
                if (timeFraction > 1) timeFraction = 1;
                getCarIcon.style.left = `${timeFraction * 75}%`;
                if (getCarIcon.style.left === '75%' && winner === 0 && getRaceBtn.disabled === true) {
                  winner = getId;
                  const createWinnerBlock = div('winner-title');
                  const getTime = (getAnimationSpeed / 1000).toFixed(2);
                  createWinnerBlock.setTextContent(`Winner is ${getTitleId?.textContent} with time ${getTime}s !`);
                  try {
                    await this.createWinner(getId, 1, Number(getTime));
                  } catch (err) {
                    const getWinner = await this.response.getWinner(getId);
                    console.log(getWinner);
                    if (getWinner.time >= Number(getTime)) {
                      await this.updateWinner(getId, getWinner.wins + 1, Number(getTime));
                    } else {
                      await this.updateWinner(getId, getWinner.wins + 1, getWinner.time);
                    }
                  }
                  const getResetBtn = document.getElementById('reset-btn');
                  getResetBtn?.removeAttribute('disabled');
                  document.body.append(createWinnerBlock.getNode());
                  setTimeout(() => {
                    createWinnerBlock.getNode().remove();
                  }, 2000);
                }
                if (timeFraction < 1 && checkAnimation && !stopBtn) {
                  stopBtn = false;
                  requestAnimationFrame(loop);
                } else {
                  cancelAnimationFrame(requestAnimationFrame(loop));
                }
              }; requestAnimationFrame(loop);
              try {
                await this.response.startEngine([{ key: 'id', value: getId }, { key: 'status', value: 'drive' }]);
              } catch (error) {
                checkAnimation = false;
              }
            }
          }
        });
        const engineStop = button('engine-btn', 'B', async (e) => {
          stopBtn = true;
          if (e.target instanceof HTMLElement) {
            e.target.setAttribute('disabled', '');
            const getParentBlock = e.target.parentNode?.parentElement?.parentElement;
            const getId = Number(getParentBlock?.id);
            const getCarIcon = document.getElementById(`car-${getId}`);
            getCarIcon?.removeAttribute('style');
            await this.response.startEngine([{ key: 'id', value: getId }, { key: 'status', value: 'stopped' }]);
            getCarIcon?.removeAttribute('style');
            const getStart = document.getElementById(`start-A-${getId}`);
            getStart?.removeAttribute('disabled');
          }
          stopBtn = false;
        });
        engineStart.setAttribute('id', `start-A-${el.id}`);
        engineStop.setAttribute('id', `stop-B-${el.id}`);
        engineStop.setAttribute('disabled', '');
        const btnsBlock = div('control-btns-block', selectBtn, removeBtn, engineStart, engineStop);
        const controlBlock = div('controls-block', carTitle, btnsBlock);
        const raceBlock = div('race-block', carSvg, finishFlag);
        const carBlock = div('car-block', controlBlock, raceBlock);
        carBlock.setAttribute('id', `${el.id}`);
        mainGarageBlock.append(carBlock.getNode());
      });
    }
    mainGarageBlock.append(paginationBlock.getNode());
    document.body.append(mainGarageBlock.getNode());
  };

  paginationNext = (queryParams: QueryParams[]) => {
    const getGarageBlock = document.querySelector('.garage-block');
    getGarageBlock?.remove();
    const nextPage = queryParams.map((elem) => {
      let { value } = elem;
      const { key } = elem;
      if (key === '_page') {
        value = Number(value) + 1;
        localStorage.setItem('page', `${value}`);
      }
      return { key, value };
    });
    this.LoadGarage(nextPage);
  };

  paginationBack = (queryParams: QueryParams[]) => {
    const getGarageBlock = document.querySelector('.garage-block');
    getGarageBlock?.remove();
    const previousPage = queryParams.map((elem) => {
      let { value } = elem;
      const { key } = elem;
      if (key === '_page') {
        value = Number(value) - 1;
        localStorage.setItem('page', `${value}`);
      }
      return { key, value };
    });
    this.LoadGarage(previousPage);
  };

  createCar = async (name:string, color: string) => {
    const createBody = { name, color };
    const newCar = await this.response.createCar(createBody);
    return newCar;
  };

  createWinner = async (id:number, wins: number, time: number) => {
    const createBody = { id, wins, time };
    const newCar = await this.response.createWinner(createBody);
    return newCar;
  };

  updateWinner = async (id:number, wins: number, time: number) => {
    const createUpdate = { wins, time };
    const newCar = await this.response.updateWinner(id, createUpdate);
    return newCar;
  };

  selectCar = async (e: Event) => {
    if (e.target instanceof HTMLElement) {
      const getParentBlock = e.target.parentNode?.parentElement?.parentElement;
      const getId = Number(getParentBlock?.id);
      const getCar = await this.response.getCar(getId);
      const getUpdateCarForm = document.querySelector('.update-car-form');
      getUpdateCarForm?.childNodes.forEach((elem) => {
        if (elem instanceof HTMLElement) elem?.removeAttribute('disabled');
        const setColor = document.getElementById('color-update');
        const setText = document.getElementById('text-update');
        setColor?.setAttribute('value', `${getCar.color}`);
        setText?.setAttribute('value', `${getCar.name}`);
      });

      getUpdateCarForm?.setAttribute('id', `${getId}`);
    }
  };
}
