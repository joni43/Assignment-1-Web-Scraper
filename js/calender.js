'use strict'
const cheerio = require('cheerio')
const rp = require('request-promise')
const Fetch = require('./fetch-helpers')

// Number 1
// Calendar.
/**
 * Read the calendar page html page and retrieve the ok and sync day
 * @param calUrl
 */

  async function fetchAvaibleDays (calUrl) {
   const usersURL = await Fetch.links(calUrl)
   const availableDays = []

      let finalData = []


        // do a for loop for usersURL array
      for (let i = 0; i < usersURL.length; i++) {
        console.log(usersURL)
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
            console.log(tdData)
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
            console.log('booo', availableDays)
            return availableDays
          }
        })
      }
}
function daysInCommon (days) {
  console.log('wanna check', days)
  return days.reduce(common)
}

function common (everyone, person) {

  return everyone.filter((day) => person.includes(day))
}

module.exports = {
  fetchAvaibleDays: fetchAvaibleDays
  , daysInCommon: daysInCommon
}
