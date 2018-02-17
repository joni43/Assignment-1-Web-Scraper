
/**
* fetch-helpers
*
* @author Jonathan Nilsson
* @version 1.1.0
*/

const rp      = require('request-promise')
const fetch   = require('node-fetch')
const cheerio = require('cheerio')

function fetchJSON(url) {
  return fetch(url).then((response) => response.json())
}

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

module.exports = {
    json:    fetchJSON
  , cheerio: fetchCheerio
  , links:   fetchLinks
}