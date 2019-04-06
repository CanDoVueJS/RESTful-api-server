module.exports = (dateString) => {
  try {
    dateString = dateString.includes('+00:00')
      ? dateString.replace('+00:00', '-09:00')
      : dateString + ' -09:00';
    
    const date = new Date(dateString);
    console.log('in -> ', dateString, ' > ', date.toISOString());
    return date.toISOString();
  }
  catch (e) {
    return dateString;
  }
};
