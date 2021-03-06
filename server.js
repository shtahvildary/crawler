var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  // url = 'http://www.imdb.com/title/tt1229340/';
  url = 'https://www.aparat.com/';
  // url = 'https://www.aparat.com//etc/api/mostviewedvideos';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      // console.log($)
      // console.log(response.body)

      var title, release, rating;
      var json = 
      { title : "", release : "", rating : ""};
      
      //aparat
      $("[data-ux='پربازدید‌ترین‌های امروز']").filter(function(){
      // $('.video-item__title').filter(function(){
        // $('.title_wrapper').filter(function(){
        var data = $(this);
        console.log(data)
        // title = data.children().first().text().trim();
        title = data.children().children().children().toArray();
        // title = data.children().children().children().first().text().trim();
        release = data.children().children().children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;