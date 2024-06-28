import { BaseComponents } from './baseComponents';
import { Sprite } from './spriteComponent';

export const div = (className: string, ...children: BaseComponents[]) => new BaseComponents({ tag: 'div', className }, ...children);
export const p = (className: string, text: string) => new BaseComponents({ tag: 'p', className, text });

export const h1 = (className: string, text: string) => new BaseComponents({ tag: 'h1', className, text });

export const button = (className: string, text: string, onClick: EventListener) => {
  const call = new BaseComponents({ tag: 'button', className, text });
  call.addListener('click', onClick);
  return call;
};

export const sprite = (className: string, path: string) => {
  const createUse = new Sprite({ tag: 'use' });
  createUse.setAttributeNS('xlink:href', path);
  const createSvg = new Sprite({ tag: 'svg', className: `${className}` }, createUse);
  return createSvg;
};

export const img = (className: string, path: string) => {
  const call = new BaseComponents({ tag: 'img', className });
  call.setAttribute('src', `${path}`);
  return call;
};

export const form = (className: string, ...children: BaseComponents[]) => {
  const call = new BaseComponents({ tag: 'form', className }, ...children);
  return call;
};

export const input = (className: string) => {
  const call = new BaseComponents({ tag: 'input', className });
  return call;
};
