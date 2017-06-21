var http = require('http');
var cron = require('cron');

var jsonfile = require('jsonfile')

var file = 'data.json'


var cronJob = cron.job("0 * * * * *", function(){
    get();
});
cronJob.start();

var accessToken = "fcf8a1da88251556b064534daf8b5c24";

var interval = 10*1000;
var dataArray = [];
// get();


function get() {

    var request = require("request");

    var options = { method: 'GET',
        url: 'https://ideabiz.lk/apicall/iLocate/v1/getCurrentLocation/777336201',
        qs: { number: '765153295' },
        headers:
            { 'cache-control': 'no-cache',
              'content-type': 'application/x-www-form-urlencoded',
              'authorization': 'Bearer '+accessToken } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        var details = JSON.parse(body)[0];
        console.log(details.number);
        var latitude = details.lat;
        var longitude = details.lon;
        var time = details.timestamp;

        var data = {
            latitude:latitude,
            longitude:longitude,
            timestamp:time
        };

        dataArray.push(data);
        console.log(dataArray);

        jsonfile.writeFile(file, dataArray, function (err) {
            console.error(err)
        })
    });

}