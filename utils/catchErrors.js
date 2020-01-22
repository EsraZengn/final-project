function catchErrors(error, displayError) {
  let errorMessage;
  if (error.response) {
    // the request was made but the server responded with a status code that is not in the range of 2xx
    errorMessage = error.response.data;
    // for cloudinary image uploads
    if (error.response.data.error) {
      errorMessage = error.response.data.error.message;
    }
  } else if (error.request) {
    // the request was made but no response was received
    errorMessage = error.request;
  } else {
    //sth else happened while making the request that triggered an error
    errorMessage = error.message;
  }
  displayError(errorMessage);
}

export default catchErrors;
