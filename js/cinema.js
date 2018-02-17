
/**
* Cinema
* @author Jonathan Nilsson
* @version 1.1.0
*/

'use strict'
const cin = require('./calender')
const cheerio = require('cheerio')
var request = require('request')
const rp = require('request-promise').defaults({ simple: false })
const fetch = require('node-fetch')

const Fetch = require('./fetch-helpers')

function padZero(number) {
  console.log('wtf', number)
  return String(number).padStart(2, '0')
}

async function getAvailableMovies(url, availableDayIDs) {
console.log('i want to check urls', url, availableDayIDs)
  function makeULR(day, movie) { return `${url}/check?day=${day}&movie=${movie}` }

  // TODO | - Do not hard code days and movies
  //const dayIDs   = [5,6,7].map(padZero)
  const movieIDs = [1,2,3].map(padZero)

  const availableMovies = []

  // TODO | - Fetch all movies in parallel with Promise.all
  for (let dayID of availableDayIDs) {
    for (let movieID of movieIDs) {
      const ajaxURL = makeULR(dayID, movieID)
      const movies = await Fetch.json(ajaxURL)
      availableMovies.push(...movies.filter((movie) => movie.status === 1))
    }
  }

  return availableMovies
}

module.exports = {
  getAvailableMovies: getAvailableMovies
}