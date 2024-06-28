import { GarageDom } from './main/garage/garage';
import { Controls } from './main/garage/controls';
import { QueryParams } from './interfaces/interface';
import { WinnersView } from './main/winners/winners';

export class App {
  protected garage: GarageDom;

  protected controls: Controls;

  protected queryParams: QueryParams[];

  protected win: WinnersView;

  protected queryParamsWinners: QueryParams[];

  constructor(queryParamsWinners: QueryParams[], ...queryParams: QueryParams[]) {
    this.garage = new GarageDom();
    this.controls = new Controls();
    this.win = new WinnersView();
    this.queryParams = queryParams;
    this.queryParamsWinners = queryParamsWinners;
  }

  start() {
    this.controls.loadBlock(this.queryParams);
    this.win.loadViewSection(this.queryParamsWinners);
    this.garage.LoadGarage(this.queryParams);
  }
}
