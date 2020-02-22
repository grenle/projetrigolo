module.exports = function log(){
  const now = new Date().toISOString()
  let args = Array.prototype.slice.call(arguments)
  args.splice(0, 0, now)
  console.log.apply(null, args)
}