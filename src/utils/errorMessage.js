export function getErrorMessage(response) {
  let messages = [];
  var isError = response.isError;

  if (isError) {
    var responseException = response.responseException;

    if (responseException) {
      var isValidationError =
        responseException.validationErrors &&
        responseException.validationErrors.length > 0;

      if (isValidationError) {
        responseException.validationErrors.forEach(element => {
          messages.push({
            key: element.name,
            reason: element.reason
          });
        });
      } else if (responseException.exceptionMessage) {
        messages.push({
          key: "exceptionMessage",
          reason: responseException.exceptionMessage
        });
      }
    } else if (response.message) {
      messages.push({
        key: "message",
        reason: response.message
      });
    } else {
      messages.push({
        key: "message",
        reason: "Error"
      });
    }
  }
  return messages;
}
