import { BaseComponents } from './baseComponents';

export class Sprite extends BaseComponents {
  protected children: (SVGElement | null)[] = [];

  constructor({ tag = '', className = '' }, ...children: Sprite[]) {
    super({ tag, className });
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    node.setAttribute('class', className);
    this.node = node;
    if (children) {
      this.appendSVGChildren(children);
    }
  }

  appendSVG(element: Sprite | SVGElement) {
    if (element instanceof Sprite) {
      if (element instanceof SVGElement) this.children.push(element);
      this.node.append(element.getSVGNode());
    } else {
      this.node.append(element);
    }
  }

  appendSVGChildren(items: (Sprite | SVGElement | null)[]) {
    items.forEach((element) => {
      if (element !== null) this.appendSVG(element);
    });
  }

  setAttributeNS(attribute:string, value: string) {
    if (this.node !== null) this.node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
  }

  getSVGNode() {
    return this.node;
  }
}
