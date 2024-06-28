import { App } from './components/App';

if (localStorage.getItem('page') === null) {
  localStorage.setItem('page', '1');
  const getItem = localStorage.getItem('page');
  const play = new App([{ key: '_page', value: 1 }, { key: '_limit', value: 10 }], { key: '_page', value: Number(getItem) }, { key: '_limit', value: 7 });
  play.start();
} else {
  const getItem = localStorage.getItem('page');
  const play = new App([{ key: '_page', value: 1 }, { key: '_limit', value: 10 }], { key: '_page', value: Number(getItem) }, { key: '_limit', value: 7 });
  play.start();
}
