/**
* The starting point of the application.
*
* @author Jonathan Nilsson
* @version 1.1.0
*/
'user strict'
const GetLinks = require('./js/calender')
const CinemaModule = require('./js/cinema')
const ResturantModule = require('./js/resturant')
const LetsTurnThisOn = require('./js/letsgo')

const url = process.argv[2] || ('http://vhost3.lnu.se:20080/weekend')
let homelinks = []

async function WebCrawl (url) {
  let links = await GetLinks.getLinks(url)
  console.log('Fetching links...OK')
  return links
}
let startlinks = WebCrawl(url)

startlinks.then(async function (StartUrl) {
  homelinks = StartUrl
  let calenderUrl = homelinks[0]
  let cinemaUrl = homelinks[1]
  let resturantUrl = homelinks[2]

  let usersCal = await GetLinks.Calendar(calenderUrl) // Här la jag till await
  console.log('Finding free days..ok', usersCal)
  let cinemaCal = await CinemaModule.Cinema(cinemaUrl)  // Och här
  console.log('Fetching movie shows...OK', cinemaCal)
  let movieObject = await CinemaModule.GetAvaibleMovie()
  console.log('------>', movieObject)
  await ResturantModule.Resturant(resturantUrl)
  let rest = await ResturantModule.LoginResturant(resturantUrl)
  let NowWeGo = await LetsTurnThisOn.letsGo(movieObject, rest)
  console.log(NowWeGo)
})
