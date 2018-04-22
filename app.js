/**
* The starting point of the application.
*
* @author Jonathan Nilsson
* @version 1.1.0
*/
'user strict'
const Calendar = require('./js/calender')
const CinemaModule = require('./js/cinema')
const RestaurantModule = require('./js/resturant')
const TheBigDay = require('./js/return-result')

// http://vhost3.lnu.se:20080/weekend
const url = process.argv[2] || ('http://vhost3.lnu.se:20080/weekend')
let homelinks = []

async function getThreeUrl (url) {
  let links = await Calendar.fetchLinks(url)
  console.log('Fetching links...OK')
  return {
    calendar: links[0],
    cinema: links[1],
    restaurant: links[2]
  }
}
async function main () {
  // console.log('Fetching movie shows...OK')
  const homelinks = await getThreeUrl(url)

  console.log('Finding free days...OK')
  const availableDays = await Calendar.fetchAvailableDays(homelinks.calendar)

  const daysInCommon = Calendar.daysInCommons(availableDays)

  console.log('Fetching movie shows...OK')
  let movieObject = await CinemaModule.GetAvaibleMovie(homelinks.cinema, daysInCommon)
  const filterMovieObject = await CinemaModule.sortMovies(movieObject, daysInCommon)

  const loginLink = await RestaurantModule.Restaurant(homelinks.restaurant, daysInCommon)
 // Get link to login to resturant
  console.log('Fetching resturant bookings...OK')
  let rest = await RestaurantModule.LoginResturant(homelinks.restaurant, loginLink, daysInCommon)

  console.log('Putting together recommendations...OK')
  let presentation = await TheBigDay.returnResult(filterMovieObject, rest)
}
main()
