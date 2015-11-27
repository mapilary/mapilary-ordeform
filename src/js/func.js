'use strict';

var $      = require('jquery'),
    moment = require('moment');

function buildUsername (username, company) {
    if (company) {
        return [username, company].join('#');
    }
    return username;
}

function getToken (options) {
    var username = buildUsername(options.username, options.company);
    return $.ajax({
        url: options.baseUrl + 'token',
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': (function () {
                return 'Basic ' + btoa(username + ':' + options.password);
            })()
        }
    })
    .then(function (auth) {
        return {
            accessToken: auth.access_token,
            tokenExpire: moment().add(auth.expires_in, 'seconds')
        };
    });
}

function buildDispatchOrder (request) {
    var now = new Date();
    return {
        delivery: {
            duration: 3600,
            note: request.note,
            priority: 2,
            startDate: now,
            state: 'Created',
            addresses: [{
                type: 'pickup',
                consignee: request.shopName,
                text: request.shopAddress
            }, {
                type: 'drop',
                consignee: request.name + ' ' + request.surname,
                text: request.consigneeAddress
            }]
        }
    };
}

function buildDeliveryOrder (request) {
    var now = new Date();
    return {
        customTrackingNr: request.trackingNr,
        priority: 2,
        deliveryDate: now,
        note: request.note,
        state: 'UNSPECIFIED_TIME_WINDOWS',
        stockAddress: request.stockAddress,
        preliminaryAddress: {
          text: request.consigneeAddress
        }
    };
}

function autoAssign (request, options) {
    var order = buildDispatchOrder(request);
    order.deadline = request.deadline;
    console.log(order, options);
    return $.ajax(options.baseUrl + 'autoAssign', {
        data: JSON.stringify(order),
        contentType: 'application/json',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + options.accessToken
        },
    });
}

function publishDispatch (request, options) {
    var order = buildDispatchOrder(request);
    order.deadline = request.deadline;
    order.onlinesince = request.onlinesince;
    order.timeout = request.timeout;
    console.log(order, options);
    return $.ajax(options.baseUrl + 'publishDispatch', {
        data: JSON.stringify(order),
        contentType: 'application/json',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + options.accessToken
        },
    });
}

function createDelivery (request, options) {
    var order = buildDeliveryOrder(request);
    return $.ajax(options.baseUrl + 'deliveries/new', {
        data: JSON.stringify(order),
        contentType: 'application/json',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + options.accessToken
        }
    })
    .done(function (delivery) {
      return delivery;
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomAddress() {
    var rand = getRandomInt(0, mapilary.streets.length - 1);
    var street = mapilary.streets[rand];
    return [[street[0], getRandomInt(1, 24)].join(' '), street[2]].join(', ');
}

function generateRandomAddress (lat, lng, radius) {
    var $def = $.Deferred();
    var locationGenerator = new LocationGenerator();
    var randLoc = locationGenerator.nextLocation(lat, lng, radius);
    var latlng = new google.maps.LatLng(randLoc[0], randLoc[1]);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                return $def.resolve(results[1].formatted_address);
            } else {
                return $def.reject('No results found');
            }
        } else {
            return $def.reject('Geocoder failed due to: ' + status);
        }
    });
    return $def.promise();
}

var fnc = {};
fnc.getToken = getToken;
fnc.autoAssign = autoAssign;
fnc.publishDispatch = publishDispatch;
fnc.createDelivery = createDelivery;
fnc.getRandomAddress = getRandomAddress;
fnc.generateRandomAddress = generateRandomAddress;


module.exports = fnc;
