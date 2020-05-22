export const handleLiveError = (error) => {
  let newError;
  console.log('handler Error -> ', error)
  if ('request' in error) {
    newError = {message: 'Error detected', name: 'HttpError'};
  } else {
      newError = {message: error.message, name: error.name};
  }
  return newError;
}