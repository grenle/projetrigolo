module.exports = function alphabet(){
  return [...new Array(26)].map( (_, i) => {
    return String.fromCodePoint(i+97)
  })
}