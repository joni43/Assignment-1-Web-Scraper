'use strict'
let request = require('request')
const cheerio = require('cheerio')
const rp = require('request-promise')
var bodyParser = require('body-parser')
const fetch = require('node-fetch')
let availableDays = []

function fetchCheerio (url) {
  const options = {
    url: url,
    transform: (body) => cheerio.load(body)
  }
  return rp(options)
}
function getLinks (url) {
  let StartUrl = []
  return fetchCheerio(url).then(function ($) {
    $('a').each(function (i, link) {
      let AllUrl = $(link).attr('href')
      StartUrl.push(AllUrl)
    })

    return StartUrl
  })
}

// Number 2
/**
 * Read the calendar page html page and retrieve the ok and sync day
 * @param calUrl
 */

function Calendar (calUrl) {
  return new Promise(function (resolve, reject) {
    fetchCheerio(calUrl).then(function ($) {
      let usersURL = []
      $('a').each(function (i, link) {
        var pageLink = $(link).attr('href')
        usersURL.push(pageLink)
      }) // Get links from paul peter mary. 35-42.Correct

      let finalData = []
        // do a for loop for usersURL array
      for (let i = 0; i < usersURL.length; i++) {
        // Number 3
        var options = {
          url: calUrl + usersURL[i],
          transform: function (body) {
            return cheerio.load(body)
          } // Getting cheerio boady for peter paul nad mary.
        }
        rp(options).then(function ($) { // number 3
          var tdData = []
          $('tbody tr td').each(function (d) {
            tdData.push($(this).text().toLowerCase())
          })
          finalData.push(tdData)
          if (usersURL.length === finalData.length) {
            if (finalData[0][0] && finalData[1][0] && finalData[2][0] === 'ok') {
              availableDays.push('05')
           //   console.log('its friday')
            } else if (finalData[0][1] && finalData[1][1] && finalData[2][1] === 'ok') {
              availableDays.push('06')
              // console.log('its Saturday')
            } else if (finalData[0][2] && finalData[1][2] && finalData[2][2] === 'ok') {
              availableDays.push('07')
              // console.log('its Sunday')
            }
            resolve(availableDays)
          }
        }).catch(function (err) { // 3.  Catchar peter.html,paul och marry err.
          console.log(err)
        })
      }
    })
  })
}
/**
 * Read the cinema page and retrieve the movies
 * @param CinUrl
 */
function Cinema (CinUrl) {
  let moviesList = []
  return new Promise(function (resolve, reject) {
    fetchCheerio(CinUrl).then(function ($) {
      $('option').filter(function () {
        let movie = $(this).attr('value')
        // {let test = ($(this).text())
       //  console.log(test)} Detta consologar day och movie
        if (movie === '01' || movie === '02' || movie === '03') {
          moviesList.push($(this).text())
        }
        // console.log(moviesList)
      })
      resolve(moviesList)
    }).catch(function (err) {
      console.log(err)
    })
  })
}
function tryingHard () {
  return new Promise(function (resolve, reject) {
    let day = ''
    let movie = ''
    let MovieObjects = []
    for (let j = 5; j <= 7; j += 1) {
      day = '0' + j

      for (let i = 1; i <= 3; i += 1) {
        movie = '0' + i

        fetch('http://vhost3.lnu.se:20080/cinema/check?day=' + day + '&movie=' + movie)
      .then(res => res.text())
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

module.exports.getLinks = getLinks
module.exports.Calendar = Calendar
module.exports.Cinema = Cinema
module.exports.tryingHard = tryingHard
