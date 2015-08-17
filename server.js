var app = require('connect')(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    http = require('http'),
    api = require('mapilary-apiclient-nodejs')({
        promise: true
    }),
    config = require('./config.json');

var apiToken;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/postorder', function postorder(req, res, next) {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        return res.end(req.method + ' method not allowed\n');
    }
    var delivery = req.body;

    var order = {
        duration: 3600,
        company: 'eurobest',
        note: delivery.notes,
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

    api.dispatching.autoAssign({
        delivery: order
    }, {
        auth: {
            bearer: apiToken
        }
    }).then(function() {
        console.log('Imported succesfuly');
    }).catch(function(err) {
        console.error(err);
    });
});

api.url(config.api.url);
api.authentication.login(null, {
    auth: {
        user: config.api.user,
        pass: config.api.password
    }
}).then(function(token) {
    apiToken = token.access_token;
    http.createServer(app).listen(config.port, function() {
        console.log('Starting listener on port:%s @%s', config.port, new Date().toTimeString());
    });
}).catch(function(err) {
    console.error(err);
    // console.trace(err);
    process.exit(1);
});