'use strict'
const cin = require('./calender')
const cheerio = require('cheerio')
var request = require('request')
const rp = require('request-promise').defaults({ simple: false })
const fetch = require('node-fetch')
var availableDays = require('./calender').availableDays

/**
* Cinema.s
* @version 1.1.0
*/

let moviesList = []
let AvailableMovies = []

function fetchCheerio (url) {
  const options = {
    url: url,
    transform: (body) => cheerio.load(body)
  }
  return rp(options)
}

/**
 * Read the cinema page and retrieve the movies
 * @param CinUrl
 */

function Cinema (CinUrl) {
  return new Promise(function (resolve, reject) {
    fetchCheerio(CinUrl).then(function ($) {
      $('option').filter(function () {
        let movie = $(this).attr('value')
        if (movie === '01' || movie === '02' || movie === '03') {
          moviesList.push($(this).text())
        }
      })
      resolve(moviesList)
    }).catch(function (err) {
      console.log(err)
    })
  })
}
function GetAvaibleMovie () {
  return new Promise(function (resolve, reject) {
    let day = ''
    let movie = ''
    let MovieObjects = []

    for (let j = 5; j <= 7; j += 1) {
      day = '0' + j
      for (let i = 1; i <= 3; i += 1) {
        movie = '0' + i
        fetch('http://vhost3.lnu.se:20080/cinema/check?day=' + day + '&movie=' + movie)
        .then(res => res.json())
        .then(body => {
          MovieObjects.push(body)
          if (MovieObjects.length === 9) {
            for (let movies of MovieObjects) {
              for (let statusofMovie of movies) {
                if (statusofMovie.status === 1 && statusofMovie.day === availableDays[0]) {
                  AvailableMovies.push(statusofMovie)
                }
              }
            }resolve(AvailableMovies)
          }
        })
      }
    }
  }).then(function (AvailableMovies) {
    AvailableMovies.map(AvailableMovies => {
      AvailableMovies.day = AvailableMovies.day === '05' ? 'friday' : AvailableMovies.day
      AvailableMovies.day = AvailableMovies.day === '06' ? 'saturday' : AvailableMovies.day
      AvailableMovies.day = AvailableMovies.day === '07' ? 'sunday' : AvailableMovies.day
    })
    return AvailableMovies
  }).then(function (AvailableMovies) {
    AvailableMovies.map(AvailableMovies => {
      AvailableMovies.movie = AvailableMovies.movie === '01' ? 'The Flying Deuces' : AvailableMovies.movie
      AvailableMovies.movie = AvailableMovies.movie === '02' ? 'Keep Your Seats, Please' : AvailableMovies.movie
      AvailableMovies.movie = AvailableMovies.movie === '03' ? 'A Day at the Races' : AvailableMovies.movie
    })
    return AvailableMovies
  })
    .catch(function (err) {
      console.log(err)
    })
}

module.exports.Cinema = Cinema
module.exports.GetAvaibleMovie = GetAvaibleMovie
