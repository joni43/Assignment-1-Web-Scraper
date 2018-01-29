
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

const url = ('http://vhost3.lnu.se:20080/weekend')

function WebcrawlUrl (callback) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
    }
    let StartUrl = []
    let $ = cheerio.load(body)
    links = $('a')
    $(links).each(function (i, link) {
     // console.log(link) //Ger ett konstigt terminal utskrift
      let AllUrl = $(this).attr('href')
      StartUrl.push(AllUrl) // pushar in alla url i en tom array
    })
    let CalendarLink = StartUrl[0] // tar första url, Calendar. och sedan requestar den.
    let CinemaLink = StartUrl[1] /7 // Tar andra url, cinema,
    let ResturantLink = StartUrl[2] // tar ut tredje url, resturang


    request(CalendarLink, function (error, response, body) {
      if (!error && response.statusCode === 200) {
      }
      let usersURL = []
      let $$ = cheerio.load(body)
      let links2 = $$('a')

      $(links2).each(function (i, link) {
      var page_link = $$(this).attr('href')
      usersURL.push(page_link)
    })

      let similarDates = []
      usersURL.forEach(function (link) {
      link = CalendarLink + link
      request(link, function (error, response, body) {
            if (!error && response.statusCode === 200) {
            }

        var $ = cheerio.load(body)
        var user_dates = []
        var tr = $('tr')
        tr.each(function () {
          $(this).find('td').each(function () {
              user_dates.push($(this).text().toLowerCase())   // get ok message
            })
          similarDates.push(user_dates)
          if (usersURL.length === similarDates.length) {
          }
        })

        similarDates.push(user_dates)
        let FridayisOk = user_dates[0]
        let AllOk = []
        AllOk.push(FridayisOk)

      //   for (var i in peopeOK){
      //         if(peopeOK.indexOf('ok', i) > -1) {
      //               avaibledas.push(peopeOK.indexof('ok',i))
      //         }
      //   }
        // console.log('Friday is ' + AllOk)
        // ta reda på vilken position ok finns i arrayen. alla 3.

            // var days = ['Friday', 'Saturday', 'Sunday']

            // if (similarDates.length < 0) {
            //       for (i = 0; i < similarDates.length; i++){
            //            if (similarDates[0][i] && similarDates[1][i] && similarDates[2][i]) {
            //             break
            //            }
            //       }

            // }
      })
    })
    })

    callback(error, StartUrl)
  })
}
WebcrawlUrl(function (err, links) {
  if (err) return console.log(err)
})
// const fs = require('fs')
// // const cheerio = require('cheerio')
// const request = require('request')
// const { JSDOM } = require('jsdom')

// const url = ('http://vhost3.lnu.se:20080/weekend')

// function WebcrawlUrl (url) {
//   request.get(url, function (error, response, html) {
//      if (!error && response.statusCode === 200) {
//        const dom = new JSDOM(html)
//        Array.from(dom.window.document.querySelectorAll('a')).forEach(element => {
//         console.log(element.href)
//           // consol loge calend,cinema å dinner.
//          WebcrawlUrl(element.href) // Call function in a function, går nu in i en av href element. calendar)

//        })
//      }
//    })
//  }
//  WebcrawlUrl(url)

// Call function in a function.Recursion.
// const url = ('http://vhost3.lnu.se:20080/weekend')
// url + /calendar +

            // get ok message
            // user_dates.push($(this).text())

            // switch (i) {
            //   case 0:
            // weekend.friday = $(this).html()

      // case 1:
            // weekend.saturday = $(this).html()

            // break
            // case 2:
            // weekend.sunday = $(this).html()

            // }
            // console.log(weekend)
