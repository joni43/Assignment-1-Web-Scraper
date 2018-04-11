
'use strict'

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
async function Restaurant (resURL, ArrayDay) {
  const $ = await fetchCheerio(resURL)

  let loginLink = $('form').map(function (item, _) {
    return resURL.substring(0, resURL.lastIndexOf('/')) + $(item).attr('action')
  }).toArray()[0]

  return loginLink
}
let BookTable = []
async function LoginResturant (resURL, loginLink, ArrayDay, fetchAvailableDays) {

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

  // console.log(result.body)
  let $ = cheerio.load(result.body)
  $('input').map(function (d) {
    BookTable.push($(this).attr('value'))
  })
  BookTable.pop()

  const dayPrefixes = {
    'fri': '05',
    'say': '06',
    'sun': '07'
  }

// Only keep the table bookings on the days when everyone is available.

  BookTable = BookTable.filter((e) => {
    let dayID = dayPrefixes[e.slice(0, 3)]
    return ArrayDay.includes(dayID)
  })
  return BookTable
}

module.exports.Restaurant = Restaurant
module.exports.LoginResturant = LoginResturant

