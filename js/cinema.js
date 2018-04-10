'use strict'
const cheerio = require('cheerio')
var request = require('request')
const rp = require('request-promise').defaults({ simple: false })
const fetch = require('node-fetch')
var daysInCommon = require('./calender').daysInCommon

/**
* Cinema.s
* @version 1.1.0
*/
let ArrayDay = ''
let moviesList = []

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

async function GetAvaibleMovie () {
  return new Promise(function (resolve, reject) {
    let day = ''
    let movie = ''
    let MovieObjects = []

    for (let j = 5; j <= 7; j += 1) {
      day = '0' + j
      for (let i = 1; i <= 3; i += 1) {
        movie = '0' + i
// change to    'http://labcloudftk46.lnu.se:8080/cinema2/check?day=' IF ALT URL
        fetch('http://vhost3.lnu.se:20080/cinema/check?day=' + day + '&movie=' + movie)
        .then(res => res.json())
        .then(body => {
          MovieObjects.push(body)
          if (MovieObjects.length === 9) {
            resolve(MovieObjects)
          }
        })
      }
    }
  })
}
async function sortMovies (MovieObjects, ArrayDay) {
  const AvailableMovies = []
  for (let dayID of ArrayDay) {
    for (let movies of MovieObjects) {
      for (let statusofMovie of movies) {
        if (statusofMovie.status === 1 && statusofMovie['day'] === dayID) { AvailableMovies.push(statusofMovie) }
      }
    }
  } return AvailableMovies
}

module.exports.Cinema = Cinema
module.exports.daysInCommon = daysInCommon
module.exports.GetAvaibleMovie = GetAvaibleMovie
module.exports.sortMovies = sortMovies
