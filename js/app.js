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
const { JSDOM } = require('jsdom')

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
const url = ('http://vhost3.lnu.se:20080/weekend')


function WebcrawlUrl (callback) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
    }
    var StartUrl = []
    var $ = cheerio.load(body)
    links = $('a')
    $(links).each(function (i, link) {
     // console.log(link) //Ger ett konstigt terminal utskrift
      var AllUrl = $(this).attr('href')
      StartUrl.push(AllUrl)
      console.log(StartUrl)
    })


    callback(null, StartUrl)
  })
}
WebcrawlUrl(function (err, links) {
  if (err) return console.log(err)
})
