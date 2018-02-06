'use strict'

const cheerio = require('cheerio')
const rp = require('request-promise')

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

function Calendar (calUrl) {
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
              rp (options).then(function ($) { // number 3
                var tdData = []
                $('tbody tr td').each(function (d) {
                  tdData.push($(this).text().toLowerCase())
                })
                finalData.push(tdData)
                console.log(finalData)
                if (usersURL.length === finalData.length) {
            
                  var days = ['Friday', 'Saturday', 'Sunday']
            
                  if (finalData.length > 0) {
                    for (i = 0; i < finalData.length; i++) {
                      if (finalData[0][i] && finalData[1][i] && finalData[2][i]) {
                        console.log(`On ${days[i]}, we found a match for you guys at index: ${i}`)
                        break
                      }
                    }
                  }
                }
              }).catch(function (err) { // 3.  Catchar peter.html,paul och marry err.
        console.log(err)
      })
    }
  })
}

module.exports.getLinks = getLinks
module.exports.Calendar = Calendar
