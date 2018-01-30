
/**
 * The starting point of the application.
 *
 * @author Jonathan Nilsson
 * @version 1.1.0
 */
'user strict'

const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request')
var rp = require('request-promise')

const url = ('http://vhost3.lnu.se:20080/weekend')

function WebcrawlUrl () {
  /. Number 1, Skapar var options, som tar url, och hämtar,laddar boddy från url enligt cheerio
  var options = {
    url: url,
    transform: function (body) {
      return cheerio.load(body)
    }
  }
  // Number 1.requstar url och laddar body. Skriver enligt syntaxen i dokumentationen.
  rp(options).then(function ($) {
    let StartUrl = []
    $('a').each(function (i, link) {
      let AllUrl = $(this).attr('href')
      StartUrl.push(AllUrl) // pushar in alla url i en tom array
    })
    let CalendarLink = StartUrl[0] // tar första url, Calendar. och sedan requestar den.
    let CinemaLink = StartUrl[1] / 7 // Tar andra url, cinema,
    let ResturantLink = StartUrl[2] // tar ut tredje url, resturang

    // Requstar första url, och får ut sidan med 3 länkar till Cinema,Calender och resturang. Tar ut dessa länkar geom ta varje 'a' och letar attr 'href'
// ---------------------------------------------------------------------------------------
// Rquest CALENDER. Number 2
    var options = {
      url: CalendarLink,
      transform: function (body) {
        return cheerio.load(body)
      }
    }
    //Number 2
    rp(options).then(function ($) {
      let usersURL = []

      $('a').each(function (i, link) {
        var page_link = $(this).attr('href')
        usersURL.push(page_link)
      }) // Get links from paul peter mary. 35-42.Correct

      let finalData = []
      // do a for loop for usersURL array
      for (let i = 0; i < usersURL.length; i++) {
         // Number 3
        var options = {
          url: CalendarLink + usersURL[i],
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
          console.log(finalData)
          if (usersURL.length === finalData.length) {
            console.log(finalData)
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
    }).catch(function (err) { // 2. catchar CALENDER ERR
      console.log(err)
    })
  }).catch(function (err) { // 1. Catchar StartURL ERR
    console.log(err)
  })

      // usersURL.forEach(function (link) {
      //   link = CalendarLink + link
      //   request(link, function (error, response, body) {
      //     if (!error && response.statusCode === 200) {
      //   }

      //     var $ = cheerio.load(body)
      //     var user_dates = []
      //     var tr = $('tr')
      //     tr.each(function () {
      //     $(this).find('td').each(function () {
      //       user_dates.push($(this).text().toLowerCase())   // get ok message
      //     })
      //     console.log(user_dates)
      //     similarDates.push(user_dates)

      //     if (usersURL.length === similarDates.length) {
      //       console.log(similarDates)
      //     }
      //   })
      //     var days = ['Friday', 'Saturday', 'Sunday']

      //     if (similarDates.length < 0) {
      //     for (let i = 0; i < similarDates.length; i++) {
      //           if (similarDates[0][i] && similarDates[1][i] && similarDates[2][i]) {
      //                 console.log(`On ${days[i]}, we found a match for you guys at index: ${i}`)
      //                 break
      //               }
      //         }
      //   }
}
WebcrawlUrl(function (err, links) {
  if (err) return console.log(err)
})
