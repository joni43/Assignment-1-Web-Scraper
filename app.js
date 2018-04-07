/**
* The starting point of the application.
*
* @author Jonathan Nilsson
* @version 1.1.0
*/
'user strict'
const Fetch = require('./js/fetch')
const Calendar = require('./js/calender')
const CinemaModule = require('./js/cinema')
const RestaurantModule = require('./js/resturant')
const TheBigDay = require('./js/return-result')

const url = process.argv[2] || ('http://vhost3.lnu.se:20080/weekend')
let homelinks = []

async function getThreeUrl (url) {
  console.log('Fetching links...OK')
  let links = await Fetch.links(url)
  return {
    calendar: links[0],
    cinema: links[1],
    restaurant: links[2]
  }
}
async function main () {
  // console.log('Fetching movie shows...OK')
  const homelinks = await getThreeUrl(url)

  const availableDays = await Calendar.fetchAvailableDays(homelinks.calendar)
  console.log('Finding free days..ok')
  console.log('AA', availableDays)
  const daysInCommon = Calendar.daysInCommon(availableDays)
  console.log(daysInCommon)
  const cinemaCal = await CinemaModule.Cinema(homelinks.cinema, daysInCommon)  // Och här
  console.log('Fetching movie shows...OK', cinemaCal)

  const loginLink = await RestaurantModule.Restaurant(homelinks.restaurant, daysInCommon)
  console.log('Fetching returant bookings...OK', loginLink)

  let rest = await RestaurantModule.LoginResturant(homelinks.resturant, loginLink, daysInCommon)
  console.log('COME ONE NOW BOOI', homelinks.resturant)
  // let NowWeGo = await LetsTurnThisOn.letsGo(movieObject, rest)
 // console.log(NowWeGo)
}
main()