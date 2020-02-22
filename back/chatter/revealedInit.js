module.exports = function(xs){
  return xs.map( letter => letter === ' ' ? ' ' : '_')
}