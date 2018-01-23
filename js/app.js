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

request.get(url, function (error, response, html) {
  if (!error) {
    const dom = new JSDOM(html)
    let blaha = Array.from(dom.window.document.querySelectorAll(`a[href^='http://'], a[href^='https://']`)).map(element => element.href)
    console.log(blaha)
  }
})
//     let json = JSON.parse(body)
//     console.log('error:', error)
//     console.log('status')
// })
