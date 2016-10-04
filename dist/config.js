'use strict';

(function (ns) {
    var baseUrl, widgetUrl;
    var hostname = window.location.hostname;

    switch (hostname) {
        case 'localhost':
          baseUrl = 'http://localhost:4444/';
          widgetUrl = 'http://localhost:8000/mapilary-widget-ng/build/';
          break;
        case 'dev.mapilary.com':
          baseUrl = 'http://api2.mapilary.com/dev/';
          widgetUrl = 'http://dev.mapilary.com/widget/';
          break;
        case 'mapilary.com':
          baseUrl = 'https://api.mapilary.com/test/';
          widgetUrl = 'http://mapilary.com/widget/';
          break;
        case 'test.mapilary.com':
          baseUrl = 'https://api.mapilary.com/test/';
          widgetUrl = 'http://demo.mapilary.com/widget/';
          break;
        default:
          baseUrl = 'https://api2.mapilary.com/dev/';
          widgetUrl = 'http://dev.mapilary.com/widget/';
          break;
    }

    ns.baseUrl = baseUrl;
    ns.widgetUrl = widgetUrl;

})(window.mapilary = window.mapilary || {});
