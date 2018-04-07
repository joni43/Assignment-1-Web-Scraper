

/**
* fetch-helpers
*
* @author Jonathan Nilsson
* @version 1.1.0
*/
const rp      = require('request-promise')
const fetch   = require('node-fetch')
const cheerio = require('cheerio')

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
module.exports.links = fetchLinks
module.exports.cheerio = fetchCheerio
