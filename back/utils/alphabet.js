module.exports = function(){
  return [...new Array(26)].map( (_, i) => {
    return String.fromCodePoint(i+97)
  })
}