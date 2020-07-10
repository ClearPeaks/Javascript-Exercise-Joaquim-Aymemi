import styles from './accordion.style.scss';

import { domUtils } from '../../shared/utils';

/**
 * Customized built-in component that extends the HTMLDListElement component to implement
 * acordion-like behavior and styling.
 *
 * @export
 * @class Accordion
 * @extends {HTMLDListElement}
 */
export class Accordion extends HTMLDListElement {
  constructor() {
    super();
    this.classList.add(styles.accordion);
  }

  connectedCallback() {
    const dtElements = this.querySelectorAll('dt');
    for (const dt of dtElements) {
      dt.classList.add(styles.acc_title);
      this._addClickBehavior(dt);
    }
    const ddElements = this.querySelectorAll('dd');
    for (const dd of ddElements) {
      dd.classList.add(styles.acc_content_hidden);
    }
  }

  addElements(elements) {
    for (const elem of elements) {
      this.addElement(elem.dt, elem.dd);
    }
  }

  addElement(title, content) {
    const dt = domUtils.populate('dt', styles.acc_title, title);
    this._addClickBehavior(dt);

    const dd = domUtils.setup('dd', styles.acc_content_hidden);
    const div = domUtils.create('div');
    div.innerHTML = content;
    dd.appendChild(div);
    this.appendChild(dt);
    this.appendChild(dd);
    return dt;
  }

  _addClickBehavior(dt) {
    dt.addEventListener('click', (event) => {
      this._toggleActive(event.target);
    });
  }

  _toggleActive(selected) {
    const collapsed = !selected.classList.contains(styles.acc_title_active);
    this.querySelectorAll(`.${styles.acc_title_active}`).forEach((dt) => {
      dt.className = styles.acc_title;
      dt.nextElementSibling.className = styles.acc_content_hidden;
    });

    if (collapsed) {
      selected.classList.add(styles.acc_title_active);
    }

    const siblingDd = selected.nextElementSibling;
    if (collapsed) {
      siblingDd.classList.add(styles.acc_content_active);
      siblingDd.classList.remove(styles.acc_content_hidden);
    } else {
      siblingDd.classList.remove(styles.acc_content_active);
    }
  }
}

customElements.define('app-accordion', Accordion, { extends: 'dl' });
