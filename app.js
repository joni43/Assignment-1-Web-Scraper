
/**
* The starting point of the application.
*
* @author Jonathan Nilsson
* @version 1.1.0
*/

'user strict'

const Fetch = require('./js/fetch-helpers')
const CinemaModule = require('./js/cinema')
const ResturantModule = require('./js/resturant')
const TheBigDay = require('./js/return-result')
const Calendar = require('./js/calender')

// 'http://labcloudftk46.lnu.se:8080'

const url = process.argv[2] || 'http://vhost3.lnu.se:20080/weekend'

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

  console.log('Finding free days...OK')
  const availableDays = await Calendar.fetchAvaibleDays(homelinks.calendar)
  const daysInCommon = Calendar.daysInCommon(availableDays)
  console.log('dddddd', daysInCommon)
  let movieObject = await CinemaModule.getAvailableMovies(homelinks.cinema, daysInCommon)
  const loginLink = await ResturantModule.Resturant(homelinks.restaurant, daysInCommon)
  let rest = await ResturantModule.LoginResturant(homelinks.restaurant, loginLink, daysInCommon)
  let presentation = await TheBigDay.returnResult(movieObject, rest)

}
main()
