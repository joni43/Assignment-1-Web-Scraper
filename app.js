/**
* The starting point of the application.
*
* @author Jonathan Nilsson
* @version 1.1.0
*/
'user strict'
// var pageLoader = require('./js/pageLoader')
const cheerio = require('cheerio')
// const request = require('request')
var rp = require('request-promise')
const getLinks = require('./js/calender')

const url = process.argv[2] || ('http://vhost3.lnu.se:20080/weekend')

let homelinks = []

async function hejhopp (url) {
  let links = await getLinks.getLinks(url)
  return links
}

let startlinks = hejhopp(url)

startlinks.then(function (StartUrl) {
  homelinks = StartUrl
  let calenderUrl = homelinks[0]
  let usersCal = getLinks.Calendar(calenderUrl)
  console.log('startlinks ', calenderUrl)
  return usersCal

  // CalendarLink = StartUrl[0]
})
// .then(function () {
