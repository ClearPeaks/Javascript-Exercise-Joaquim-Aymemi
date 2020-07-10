import { baseURL } from '../../shared/config/baseurl';

/**
 * Contains all the business logic and data access related to Sections.
 *
 * @export
 * @class SectionsService
 */
export default class SectionsService {
  static findAll() {
    return fetch(`${baseURL}/sections`);
  }

  static save(title, content) {
    return fetch(`${baseURL}/sections`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
  }
}
