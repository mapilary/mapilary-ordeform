'use strict';

(function (ns) {
    var baseUrl;

    switch (window.location.hostname) {
        case 'localhost':
          baseUrl = 'http://localhost:4444/';
          break;
        case 'demo.mapilary.com':
          baseUrl = 'https://api.mapilary.com/test/';
          break;
        case 'dev.mapilary.com':
          baseUrl = 'https://api.mapilary.com/dev/';
          break;
        case 'test.mapilary.com':
          baseUrl = 'https://api.mapilary.com/test/';
          break;
        case 'xpressgo.com':
          baseUrl = 'https://api.xpressgo.com/v2/';
          break;
        default:
          baseUrl = 'https://api.mapilary.com/test/';
    }

    ns.config = {
        baseUrl: baseUrl,
        shopName: 'pneuportal.sk',
        shopAddress: 'Karpatské námestie 10, Bratislava'
    };

    ns.accessToken = sessionStorage.getItem('form.accessToken');
    ns.tokenExpire = sessionStorage.getItem('form.tokenExpire');

})(window.mapilary = window.mapilary || {});
