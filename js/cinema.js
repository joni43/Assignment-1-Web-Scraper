'use strict'
const cin = require('./calender')
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
  console.log('AAAAA', CinUrl)
  return new Promise(function (resolve, reject) {

    fetchCheerio(CinUrl).then(function ($) {
      $('option').filter(function () {
        let movie = $(this).attr('value')

        if (movie === '01' || movie === '02' || movie === '03') {
          moviesList.push($(this).text())

        }
      })
      console.log('Runkaballe', moviesList)
      resolve(moviesList)
    }).catch(function (err) {
      console.log(err)
    })
  })
}

function daysInCommons (days) {
    ArrayDay = days.reduce(common)
 console.log('will i be there and be gayt', ArrayDay)
}
function common (everyone, person) {
  return everyone.filter((day) => person.includes(day))
}
async function GetAvaibleMovie () {

  return new Promise(function(resolve, reject) {
    let day = ''
    let movie = ''
    let MovieObjects = []

    for (let j = 5; j <= 7; j += 1) {
      day = '0' + j
      for (let i = 1; i <= 3; i += 1) {
        movie = '0' + i

        fetch('http://labcloudftk46.lnu.se:8080/cinema2/check?day=' + day + '&movie=' + movie)
        .then(res => res.json())
        .then(body => {
          MovieObjects.push(body)

// finn ett eller fler fel. Movies är fel! retunerar bara 3 stycken



          if (MovieObjects.length === 9) {
resolve(MovieObjects)
          }
        })
      }
  }
})
}
async function sortMovies (MovieObjects) {
  const AvailableMovies = []
            for(let dayID of ArrayDay) {
            for (let movies of MovieObjects) {

              for (let statusofMovie of movies) {
                if (statusofMovie.status === 1 && statusofMovie['day'] === dayID)

                  AvailableMovies.push(statusofMovie)
                  // console.log('mucho el taco', AvailableMovies)
              }
            }
            console.log('THERE IS A APL ACE ', AvailableMovies)
            } return AvailableMovies
          }

//         })
//       }
//     }

// }
module.exports.Cinema = Cinema
module.exports.daysInCommons = daysInCommons
module.exports.GetAvaibleMovie = GetAvaibleMovie
module.exports.sortMovies = sortMovies
