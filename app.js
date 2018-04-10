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

// Option URL http://labcloudftk46.lnu.se:8080
// IF YOU CHANGE to alt URL, GO TO CINEMA MODULE AND CHECK LINE 57. And copy this ------>
// ------> Change in line 57. 'http://labcloudftk46.lnu.se:8080/cinema2/check?day='
// http://vhost3.lnu.se:20080/weekend
const url = process.argv[2] || ('http://vhost3.lnu.se:20080/weekend')
let homelinks = []

async function getThreeUrl (url) {
  let links = await Calendar.fetchLinks(url)
  console.log('Fetching links...OK')
  console.log(links)
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
  const tryme = await CinemaModule.sortMovies(movieObject, daysInCommon)

  const loginLink = await RestaurantModule.Restaurant(homelinks.restaurant, daysInCommon)
 // Get link to login to resturant
  console.log('Fetching resturant bookings...OK')
  let rest = await RestaurantModule.LoginResturant(homelinks.restaurant, loginLink, daysInCommon)

  console.log('Putting together recommendations...OK')
  let presentation = await TheBigDay.returnResult(tryme, rest)
}
main()
