//@ts-check

/**
 * Returns a random number between min and max (inclusive).
 * @param {number} min a natural
 * @param {number} max a natural 
 */
function randinc(min, max){
  if(!Number.isInteger(min) || !Number.isInteger(max)){
    throw 'randBetween: integer arguments';
  }
  if(min >= max){
    throw 'randBetween: min strictly less than max';
  }
  return Math.floor(Math.random()*(max-min)+min);
}

module.exports = randinc