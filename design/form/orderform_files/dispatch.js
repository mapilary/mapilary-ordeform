var apikey = '23b2208ada05b0e1b15b363eeec5ac660f4154c63b23d3c8d102d93c0e65ca3d';
var url = 'https://api.mapilary.com/dev/autoAssign';

function buildOrder(delivery) {
    return {
        duration: 3600,
        company: 'eurobest',
        note: delivery.note,
        priority: 2,
        startDate: new Date(),
        state: 'Created',
        addresses: [{
            type: 'pickup',
            consignee: delivery.shopName,
            text: delivery.shopAddress
        }, {
            type: 'drop',
            consignee: delivery.name + ' ' + delivery.surname,
            text: delivery.consigneeAddress
        }]
    };
}

function autoDispatch(delivery) {
    var order = buildOrder(delivery);
    console.log(order);
    return $.ajax(url, {
        data: JSON.stringify({delivery: order}),
        contentType: 'application/json',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apikey
        },
    });
}