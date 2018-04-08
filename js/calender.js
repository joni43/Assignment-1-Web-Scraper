const cheerio = require('cheerio')
const rp = require('request-promise')
const Fetch = require('./fetch')
const availableDays = []
/**
* Calendar
* @author Jonathan Nilsson
* @version 1.1.0
*/
'use strict'
//
/**
* Read the calendar page html page and retrieve the ok and sync day
* @param calUrl is the url to users calender. http://vhost3.lnu.se:20080/calendar/
*/
function fetchCheerio (url) {
  console.log('try', url)
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

async function fetchAvailableDays (calUrl) {
  const usersURL = await fetchLinks(calUrl)

  for (const userURL of usersURL) {
    const $ = await fetchCheerio(calUrl + userURL)

    function isAvailableDay (_, d) {
      return $(this).text().toLowerCase() === 'ok'
    }

    const tdData = $('tbody tr td').map(isAvailableDay).slice()
    const dayIDs = ['05', '06', '07']

    availableDays.push(dayIDs.filter((v, i) => tdData[i]))
  }
  return availableDays
}
module.exports.fetchAvailableDays = fetchAvailableDays
