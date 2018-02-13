
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
let loginLink

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
 // {let test = ($(this).text())
     //  console.log(test)} Detta consologar day och movie
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
  })
    .catch(function (err) {
      console.log(err)
    })
}
function Resturant (resURL) {
  return new Promise(function (resolve, reject) {
    fetchCheerio(resURL).then(function ($) {
      $('form').filter(function () {
        loginLink = resURL.substring(0, resURL.lastIndexOf('/')) + $(this).attr('action')
        resolve(loginLink)
      })
    }).catch(function (err) {
      console.log(err)
    })
  })
}

function LoginResturant (url, data) {
  return new Promise(function (resolve, reject) {
    let options = {
      method: 'POST',  // post the request
      url: loginLink,
      followRedirect: true,
      jar: true,   // important to remember cookies
      headers: {
        authorization: 'Basic emVrZTpjb3lz',
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: { username: 'zeke', password: 'coys' },
      transform: function (body) {
          console.log(body)
        return cheerio.load(body)
      }
    }
    rp(options).then(function ($) {
    })
  }).catch(function (err) {
    console.log(err)
  })
}
module.exports.Cinema = Cinema
module.exports.tryingHard = tryingHard
module.exports.Resturant = Resturant
module.exports.LoginResturant = LoginResturant
