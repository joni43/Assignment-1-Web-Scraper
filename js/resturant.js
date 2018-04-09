
'use strict'
const GetLinks = require('./calender')
const CinemaModule = require('./cinema')
const ResturantModule = require('./resturant')
const cheerio = require('cheerio')
var request = require('request')
const rp = require('request-promise').defaults({ simple: false })
const fetch = require('node-fetch')
var tough = require('tough-cookie')
/**
* Resturant
* @version 1.1.0
*/

function fetchCheerio (url) {
  const options = {
    url: url,
    transform: function (body) {
      return cheerio.load(body)
    }
  }
  return rp(options)
}
function fetchLinks (url) {
  let StartUrl = []
  return fetchCheerio(url).then(function ($) {
    $('a').each(function (i, link) {
      let AllUrl = $(link).attr('href')
      StartUrl.push(AllUrl)
    })

    return StartUrl
  })
}
async function Restaurant (resURL, availableDays) {
  const $ = await fetchCheerio(resURL)

  let loginLink = $('form').map(function (item, _) {
    return resURL.substring(0, resURL.lastIndexOf('/')) + $(item).attr('action')
  }).toArray()[0]

  return loginLink
}
let BookTable = []
async function LoginResturant (resURL, loginLink, availableDays) {

  let cookie = new tough.Cookie({
    key: 'Zeke',
    value: 'coys',
    Domain: resURL
  })


  // put cookie in an jar which can be used across multiple requests
  var cookiejar = rp.jar()

  cookiejar.setCookie(cookie, loginLink) // resURL)

  const options = {
    method: 'POST',
    uri: resURL + '/login',
    jar: cookiejar, // Tells rp to include cookies in jar that match uri
    followRedirect: true,
    followAllRedirects: true,
    resolveWithFullResponse: true,
    headers: {
      authorization: 'Basic emVrZTpjb3lz',
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: { username: 'zeke', password: 'coys' }
  }
  let result = await rp(options)
}
async function fok (availableDays)
 {

  // console.log(result.body)
  let $ = cheerio.load(result.body)
  $('input').map(function (d) {
    BookTable.push($(this).attr('value'))
  })
  BookTable.pop()

  if (parseInt(availableDays) === 5) {
    let friday = function (item) {
      return item.indexOf('fri') === 0
    }
    let startsWithFri = BookTable.filter(friday)
    console.log('WAS US DAS', availableDays)
    return startsWithFri
  } else if (parseInt(availableDays) === 6) {
    let saturday = function (item) {
      return item.indexOf('sat') === 0
    }
    let startsWithSat = BookTable.filter(saturday)
    return startsWithSat
  } else if (parseInt(availableDays) === 7) {
    let sunday = function (item) {
      return item.indexOf('sun') === 0
    }
    let starsWithSun = BookTable.filter(sunday)
     return starsWithSun
  }
  return BookTable
}

module.exports.Restaurant = Restaurant
module.exports.LoginResturant = LoginResturant
