import { BaseComponents } from '../../html_components/baseComponents';
import {
  h1, p, div, sprite, button,
} from '../../html_components/tags';
import { QueryParams, WinData, Winners } from '../../interfaces/interface';
import { GarageDom } from '../garage/garage';

import './winners_style.css';

const carIcon = require('../../../assets/icons/car_icon.svg');

export class WinnersView extends GarageDom {
  loadViewSection = async (queryParams: QueryParams[]) => {
    const viewSection = div('view-section', this.loadViewControls(queryParams));
    const getNode = viewSection.getNode();
    getNode.append(await this.loadWinnersTable(queryParams));
    document.body.append(getNode);
  };

  loadWinnersTable = async (queryParams: QueryParams[]) => {
    let winsCheck = false;
    let timeCheck = false;
    const getPreviosWinnersBlock = document.querySelector('.winners-page');
    getPreviosWinnersBlock?.remove();
    const data: WinData = await this.response.getWinners(queryParams);
    const getQueryPageVal = queryParams[0].value;
    const winTitle = h1('win-title', `Winners (${data.count || 0})`);
    const winPage = p('win-title', `Page #${getQueryPageVal}`);
    const tableNumber = p('table-header', 'Number');
    const tableCar = p('table-header', 'Car');
    const tableModel = p('table-header', 'Name');
    const tableWins = p('table-header', 'Wins');
    const tableTime = p('table-header', 'Best Times(sec)');

    const tableHeaderBlock = div('table-header-block', tableNumber, tableCar, tableModel, tableWins, tableTime);
    const resultSection = div('result-section');
    this.generateRows(data.data, resultSection);
    const tableBlock = div('table-block', tableHeaderBlock, resultSection);

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
    const winnersPage = div('winners-page', winTitle, winPage, tableBlock, paginationBlock);
    tableTime.addListener('click', async () => {
      if (timeCheck === false) {
        timeCheck = true;
        const getNode = tableTime.getNode();
        getNode.textContent = 'Best Times(sec) ↑';
        const getNodeWins = tableWins.getNode();
        getNodeWins.textContent = 'Wins';
        const getResultSection = document.querySelector('.result-section');
        getResultSection?.remove();
        queryParams.push({ key: '_sort', value: 'time' });
        queryParams.push({ key: '_order', value: 'ASC' });
        const sortData: WinData = await this.response.getWinners(queryParams);
        const newResultSection = div('result-section');
        this.generateRows(sortData.data, newResultSection);
        tableBlock.append(newResultSection);
        queryParams.pop();
        queryParams.pop();
      } else {
        timeCheck = false;
        const getNode = tableTime.getNode();
        getNode.textContent = 'Best Times(sec) ↓';
        const getNodeWins = tableWins.getNode();
        getNodeWins.textContent = 'Wins';
        queryParams.push({ key: '_sort', value: 'time' });
        queryParams.push({ key: '_order', value: 'DESC' });
        const getResultSection = document.querySelector('.result-section');
        getResultSection?.remove();
        const sortData: WinData = await this.response.getWinners(queryParams);
        const newResultSection = div('result-section');
        this.generateRows(sortData.data, newResultSection);
        tableBlock.append(newResultSection);
        queryParams.pop();
        queryParams.pop();
      }
    });
    tableWins.addListener('click', async () => {
      if (winsCheck === false) {
        winsCheck = true;
        const getNode = tableWins.getNode();
        getNode.textContent = 'Wins ↑';
        const getNodeTable = tableTime.getNode();
        getNodeTable.textContent = 'Best Times(sec)';
        const getResultSection = document.querySelector('.result-section');
        getResultSection?.remove();
        queryParams.push({ key: '_sort', value: 'wins' });
        queryParams.push({ key: '_order', value: 'ASC' });
        const sortData: WinData = await this.response.getWinners(queryParams);
        const newResultSection = div('result-section');
        this.generateRows(sortData.data, newResultSection);
        tableBlock.append(newResultSection);
        queryParams.pop();
        queryParams.pop();
      } else {
        winsCheck = false;
        const getNode = tableWins.getNode();
        getNode.textContent = 'Wins ↓';
        const getNodeTable = tableTime.getNode();
        getNodeTable.textContent = 'Best Times(sec)';
        const getResultSection = document.querySelector('.result-section');
        getResultSection?.remove();
        queryParams.push({ key: '_sort', value: 'wins' });
        queryParams.push({ key: '_order', value: 'DESC' });
        const sortData: WinData = await this.response.getWinners(queryParams);
        const newResultSection = div('result-section');
        this.generateRows(sortData.data, newResultSection);
        tableBlock.append(newResultSection);
        queryParams.pop();
        queryParams.pop();
      }
    });
    return winnersPage.getNode();
  };

  loadViewControls(queryParams: QueryParams[]) {
    const switchView = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.id === 'winners-view') {
          e.target.setAttribute('disabled', '');
          const getOposite = document.getElementById('garage-view');
          getOposite?.removeAttribute('disabled');
        } else {
          e.target.setAttribute('disabled', '');
          const getOposite = document.getElementById('winners-view');
          getOposite?.removeAttribute('disabled');
        }
      }
    };
    const toGarage = button('control-btn', 'To Garage', (e) => {
      switchView(e);
      const getWinnersPage = document.querySelector('.winners-page');
      getWinnersPage?.classList.remove('show');
      const getControlBlock = document.querySelector('.control-block');
      const getGarageBlock = document.querySelector('.garage-block');
      getControlBlock?.classList.remove('hide');
      getGarageBlock?.classList.remove('hide');
    });
    toGarage.setAttribute('id', 'garage-view');
    toGarage.setAttribute('disabled', '');
    const toWinners = button('control-btn', 'To Winners', async (e) => {
      switchView(e);
      const getView = document.querySelector('.view-section');
      const getWinnersPage = document.querySelector('.winners-page');
      getWinnersPage?.remove();
      const getControlBlock = document.querySelector('.control-block');
      const getGarageBlock = document.querySelector('.garage-block');
      getControlBlock?.classList.add('hide');
      getGarageBlock?.classList.add('hide');
      getView?.append(await this.loadWinnersTable(queryParams));
      const getWinnersPage2 = document.querySelector('.winners-page');
      getWinnersPage2?.classList.add('show');
    });
    toWinners.setAttribute('id', 'winners-view');
    const createControlView = div('control-view-block', toGarage, toWinners);
    return createControlView;
  }

  generateRows(data: Winners[], resultSection: BaseComponents) {
    data.forEach(async (elem, index) => {
      const getCarsData = await this.response.getCar(elem.id);
      const carPlace = p('car-place', `${index + 1}`);
      const carTitle = p('win-car-title', `${getCarsData.name}`);
      carTitle.setAttribute('id', `title-${getCarsData.id}`);
      const carSvg = sprite('win-car-icon', `${carIcon}#car_icon`);
      carSvg.setAttribute('fill', `${getCarsData.color}`);
      carSvg.setAttribute('id', `car-win-${getCarsData.id}`);
      const carWins = p('car-wins', `${elem.wins}`);
      const carTime = p('car-time', `${elem.time}s`);
      const createResultRow = div('win-row', carPlace, carSvg, carTitle, carWins, carTime);
      createResultRow.setAttribute('id', `win-car-${elem.id}`);
      resultSection.append(createResultRow);
    });
  }

  paginationNext = async (queryParams: QueryParams[]) => {
    const getView = document.querySelector('.view-section');
    const getWinnersPage = document.querySelector('.winners-page');
    getWinnersPage?.remove();
    const nextPage = queryParams.map((elem) => {
      let { value } = elem;
      const { key } = elem;
      if (key === '_page') {
        value = Number(value) + 1;
        localStorage.setItem('page', `${value}`);
      }
      return { key, value };
    });
    getView?.append(await this.loadWinnersTable(nextPage));
    const getWinnersPage2 = document.querySelector('.winners-page');
    getWinnersPage2?.classList.add('show');
  };

  paginationBack = async (queryParams: QueryParams[]) => {
    const getView = document.querySelector('.view-section');
    const getWinnersPage = document.querySelector('.winners-page');
    getWinnersPage?.remove();
    const previousPage = queryParams.map((elem) => {
      let { value } = elem;
      const { key } = elem;
      if (key === '_page') {
        value = Number(value) - 1;
        localStorage.setItem('page', `${value}`);
      }
      return { key, value };
    });
    getView?.append(await this.loadWinnersTable(previousPage));
    const getWinnersPage2 = document.querySelector('.winners-page');
    getWinnersPage2?.classList.add('show');
  };
}
