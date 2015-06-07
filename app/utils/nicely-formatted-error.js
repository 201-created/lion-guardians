export default function nicelyFormattedError(e){
  let errorName, errorMessage;

  if (e.responseJSON) {
    errorName = e.responseJSON.error;
    errorMessage = e.responseJSON.message;
  } else {
    errorName = e;
    errorMessage = e.message;
  }

  return {name: errorName, message: errorMessage};
}
