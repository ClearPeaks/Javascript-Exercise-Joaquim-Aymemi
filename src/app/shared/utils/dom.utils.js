/**
 * A less verbose call to document.createElement used for convenience.
 *
 * @export
 * @param {string} tagName  The type of DOM element specified by its tag name
 * @returns
 */
export function create(tagName) {
  return document.createElement(tagName);
}

/**
 *  Creates a new DOM element with the given tagName and optional CSS classes.
 *
 * @param {string} tagName      The type of DOM element specified by its tag name
 * @param {string[]} classList  CSS classes to apply
 * @returns
 */
export function setup(tagName, classList) {
  const newDomElement = this.create(tagName);
  newDomElement.classList = classList;
  return newDomElement;
}

/**
 * Creates a new DOM element with the given tagName and optional CSS classes, and
 * fills it with the given content.
 *
 * @param {string} tagName      The type of DOM element specified by its tag name
 * @param {string[]} classList  CSS classes to apply
 * @param {string} content      Represents the innerHTML of the component
 * @returns
 */
export function populate(tagName, classList, content) {
  const newDomElement = this.setup(tagName, classList);
  newDomElement.innerHTML = content;
  return newDomElement;
}
