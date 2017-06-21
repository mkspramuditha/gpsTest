var http = require('http');
var cron = require('cron');
var request = require("request");


var jsonfile = require('jsonfile');

var file = 'data.json';

var accessToken,refreshToken;

getToken();
var cronJob = cron.job("0 * * * * *", function(){
    get();
});
cronJob.start();

// var accessToken = "fcf8a1da88251556b064534daf8b5c24";

var interval = 10*1000;
var dataArray = [];
// get();


function get() {


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

        try{
            var details = JSON.parse(body)[0];
        }catch (e){
            getToken();
        }

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

function getToken() {
    var options = {
        method: 'POST',
        url: 'https://ideabiz.lk/apicall/token',
        qs:
            { grant_type: 'password',
                scope: 'PRODUCTION',
                username: 'EffectiveSolution',
                password: 'Esol@123' },
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded',
                authorization: 'Basic RFQ0dWFRRlFUUjQ0NURiOXY0UW1FQ1BwWUlJYTpBblBfVU1oY3ZqaXJZWENlanVJSTZJdGNHT3Nh'
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var tokenResponse = JSON.parse(body);
        refreshToken = tokenResponse.refresh_token;
        accessToken = tokenResponse.access_token;
        return true;
    });
}