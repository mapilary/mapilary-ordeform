'use strict';

(function (ns) {
    var baseUrl, widgetUrl, trackerUrl;

    switch (window.location.hostname) {
        case 'localhost':
          baseUrl = 'http://localhost:4444/';
          widgetUrl = 'http://localhost:8000/mapilary-widget-ng/build/';
          trackerUrl = 'http://localhost:8000/mapilary-tracker-ng/public/';
          break;
        case 'demo.mapilary.com':
          baseUrl = 'https://api.mapilary.com/test/';
          widgetUrl = 'http://demo.mapilary.com/widget/';
          trackerUrl = 'http://demo.mapilary.com/tracker/';
          break;
        case 'dev.mapilary.com':
          baseUrl = 'http://api2.mapilary.com/dev/';
          widgetUrl = 'http://dev.mapilary.com/widget/';
          trackerUrl = 'http://dev.mapilary.com/tracker/';
          break;
        case 'test.mapilary.com':
          baseUrl = 'https://api.mapilary.com/test/';
          widgetUrl = 'http://demo.mapilary.com/widget/';
          trackerUrl = 'http://demo.mapilary.com/tracker/';
          break;
        case 'xpressgo.com':
          baseUrl = 'https://api.xpressgo.com/v2/';
          widgetUrl = 'https://xpressgo.com/widget/';
          trackerUrl = 'https://xpressgo.com/tracker/';
          break;
    }

    ns.baseUrl = baseUrl;
    ns.widgetUrl = widgetUrl;
    ns.trackerUrl = trackerUrl;

})(window.mapilary = window.mapilary || {});
