/**
* The starting point of the application.
*
* @author Jonathan Nilsson
* @version 1.1.0
*/
'user strict'
const getLinks = require('./js/calender')
const getLinks2 = require('./js/cinema')

const url = process.argv[2] || ('http://vhost3.lnu.se:20080/weekend')
let homelinks = []

async function WebCrawl (url) {
  let links = await getLinks.getLinks(url)
  console.log('Fetching links...OK')
  return links
}
let startlinks = WebCrawl(url)

startlinks.then(async function (StartUrl) {
  homelinks = StartUrl
  let calenderUrl = homelinks[0]
  let cinemaUrl = homelinks[1]
  let resturantUrl = homelinks[2]

  let usersCal = await getLinks.Calendar(calenderUrl) // Här la jag till await
  console.log('Finding free days..ok', usersCal)
  let cinemaCal = await getLinks2.Cinema(cinemaUrl)  // Och här
  console.log('Fetching movie shows...OK', cinemaCal)
  let test = await getLinks2.tryingHard()
  console.log(test)
  let resturangen = await getLinks2.Resturant(resturantUrl)
  console.log(resturangen)
  let login = await getLinks2.LoginResturant()
  console.log(login)

})
