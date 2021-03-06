//@ts-check

module.exports = async function processAuth(credentials){
  /**
   * todo remove the ts-ignore and fix the problem
   */
  //@ts-ignore
  const apihost = process.env.REACT_APP_APIHOST
  const url = `${apihost}/api/signon`
  console.log(`processAuth: fetch ${url}`)
  const res = await fetch(url,
    {method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)})
  const resContent = await res.json() 
  return resContent
}