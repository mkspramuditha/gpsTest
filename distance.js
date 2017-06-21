// var distance = require('google-distance');
var distance = require('google-distance-matrix');
distance.key('AIzaSyB4Zt1yc63ExuBANlRl48pjQ5u2SpUGxVc');



var fs = require('fs');
var obj;
var distanceArray = [];
fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);

    var origins = ['8.6176267,80.4707850'];
    var destinations = ['8.6275717,80.4719183'];

    // distance.matrix(origins, destinations, function (err, distances) {
    //     if (!err)
    //         console.log(JSON.stringify(distances));
    //         console.log(distances.rows[0].elements[0].distance.value);
    // })

    // console.log(obj[0]);
    var i = 0;
    console.log(obj.length);
    (function loop() {
        if (i < obj.length-1) {
            getDistance(obj[i], obj[i+1], function (value) {
                var time = new Date(new Date(obj[i+1].timestamp).getTime() - new Date(obj[i].timestamp).getTime())/(3600*1000);
                var speed = value/(1000*time);
                distanceArray.push(speed);
                console.log(speed);
                i++;
                if(i == obj.length-1){
                    console.log(distanceArray);
                }
                loop()
            });
        }
    }());

});

function getDistance(start, end,callback) {
    var origin =  start.latitude + "," + start.longitude;
    var destination = end.latitude + "," + end.longitude;
    // console.log(origin);
    // console.log(destination);

    distance.matrix([origin], [destination], function (err, distances) {
        // console.log(err);
        if (!err) {
            // console.log(JSON.stringify(distances));
            var distance = distances.rows[0].elements[0].distance.value;
            // console.log(distance);
            // distanceArray.push(distance);
            // console.log(distanceArray);
            callback(distance);
            return;
            // return true
        }
        // return false;
        callback(false);
        return;
    })
}

