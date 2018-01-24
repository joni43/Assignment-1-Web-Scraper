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

const url = ('http://vhost3.lnu.se:20080/weekend')
function WebcrawlUrl (url) {
request.get(url, function (error, response, html) {
  if (!error && response.statusCode === 200) {
    const dom = new JSDOM(html)
   Array.from(dom.window.document.querySelectorAll('a')).forEach(element => {
    console.log(element.href)
    WebcrawlUrl(element.href)

   })
  }
})
}
WebcrawlUrl(url)

// Call function in a function.Recursion.

//     let json = JSON.parse(body)
//     console.log('error:', error)
//     console.log('status')
// })
