/**
* The starting point of the application.
*
* @author Jonathan Nilsson
* @version 1.1.0
*/
'user strict'
// var pageLoader = require('./js/pageLoader')
const cheerio = require('cheerio')
var rp = require('request-promise')
const getLinks = require('./js/calender')

const url = process.argv[2] || ('http://vhost3.lnu.se:20080/weekend')

let homelinks = []
let freedays = []

async function WebCrawl (url) {
  let links = await getLinks.getLinks(url)
  return links
}
let startlinks = WebCrawl(url)

startlinks.then(async function (StartUrl) {
  homelinks = StartUrl
  let calenderUrl = homelinks[0]
  let cinemaUrl = homelinks[1]
  let resturantUrl = homelinks[2]

  let usersCal = await getLinks.Calendar(calenderUrl) // Här la jag till await
  console.log(usersCal)
  let cinemaCal = await getLinks.Cinema(cinemaUrl)  // Och här
  console.log(cinemaCal)
  let test = await getLinks.tryingHard()
  console.log(test)
})
