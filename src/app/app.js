import styles from './../assets/styles/main.scss';

// eslint-disable-next-line no-unused-vars
import { Accordion } from './components';

import { SectionsService } from './services/';

import { formsUtils } from './shared/utils';

/**
 * Application main class. Imports the styles and components and handles user interaction.
 *
 * @export
 * @class App
 */
export class App {
  constructor() {
    console.log('App started!');
    this.loadSections();
  }

  loadSections() {
    this.accordionComponent = document.querySelector('dl');

    SectionsService.findAll()
      .then((resp) =>
        resp.json().then((data) => {
          this.accordionComponent.addElements(
            data.map((section) => ({ dt: section.title, dd: section.content }))
          );
        })
      )
      .catch(function (error) {
        console.log(error); // leave the accordion empty
      });
  }

  addSection() {
    const titleInput = document.querySelector('input');
    const contentTextarea = document.querySelector('textarea');
    const button = document.querySelector('button');

    if (this._validate(titleInput, contentTextarea)) {
      button.disabled = true;
      SectionsService.save(titleInput.value, contentTextarea.value)
        .then((response) => {
          return response.json();
        })
        .then((savedSection) => {
          this.accordionComponent
            .addElement(savedSection.title, savedSection.content)
            .click();
          titleInput.value = '';
          contentTextarea.value = '';
        })
        .catch((error) => {
          console.log(error);
          alert('The section could not be added, try later please.');
        })
        .finally(() => {
          button.disabled = false;
        });
    }
  }

  _validate(titleInput, contentTextarea) {
    const titleValid = formsUtils.validateRequired(
      titleInput,
      'Title is required',
      styles.error
    );
    if (!titleValid) {
      titleInput.focus();
    }

    const contentValid = formsUtils.validateRequired(
      contentTextarea,
      'Content is required',
      styles.error
    );
    if (titleValid && !contentValid) {
      contentTextarea.focus();
    }
    return titleValid && contentValid;
  }
}
