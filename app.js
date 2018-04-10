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

// Option URL http://labcloudftk46.lnu.se:8080
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
  let cinemaCal = await CinemaModule.Cinema(homelinks.cinema)

  const daysInCommon = CinemaModule.daysInCommons(availableDays)
  console.log('AA', daysInCommon)
  const movieObject = await CinemaModule.GetAvaibleMovie(homelinks.cinema, daysInCommon)  // Och här
  console.log('Fetching movie shows...OK')

  const tryme = await CinemaModule.sortMovies(movieObject)

  const loginLink = await RestaurantModule.Restaurant(homelinks.restaurant, daysInCommon, availableDays)
  console.log('Fetching returant bookings...OK', daysInCommon)

  let rest = await RestaurantModule.LoginResturant(homelinks.restaurant, loginLink, daysInCommon, availableDays)
  console.log('Putting together recommendations...OK', rest)

  let presentation = await TheBigDay.returnResult(movieObject, rest, tryme)
}
main()
