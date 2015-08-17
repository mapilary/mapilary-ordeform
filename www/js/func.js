(function (mapilary) {
    function buildOrder (request) {
        var now = new Date();
        return {
            deadline: request.deadline,
            onlinesince: request.onlinesince,
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

    function autoAssign (request, options) {
        var order = buildOrder(request);
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
        var order = buildOrder(request);
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
                    return $def.resolve(results[1].formatted_address)
                } else {
                    return $def.reject('No results found');
                }
            } else {
                return $def.reject('Geocoder failed due to: ' + status);
            }
        });
        return $def.promise();
    }

    mapilary.fnc = mapilary.fnc || {};
    mapilary.fnc.autoAssign = autoAssign;
    mapilary.fnc.publishDispatch = publishDispatch;
    mapilary.fnc.getRandomAddress = getRandomAddress;
    mapilary.fnc.generateRandomAddress = generateRandomAddress;

})(window.mapilary = window.mapilary || {});
