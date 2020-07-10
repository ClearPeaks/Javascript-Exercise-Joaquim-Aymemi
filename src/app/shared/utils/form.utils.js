/**
 * This function validates a given input, looking for the error span that contains the errorClass and setting the errorMessage.
 *
 * @param {Object} component    The input to be validated
 * @param {string} errorMessage Error message to display
 * @param {string} errorClass   CSS class to look for the error span
 */
export function validateRequired(
  component,
  errorMessage = 'This field is required',
  errorClass = 'error'
) {
  let valid = false;
  if (component) {
    const error = component.parentElement.querySelector(`span.${errorClass}`);
    if (error) {
      valid = !component.validity.valueMissing;
      error.innerHTML = valid ? '' : errorMessage;
    }
  }
  return valid;
}
