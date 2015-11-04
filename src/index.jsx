'use strict';

require('./less/app.less');

var ReactDOM = require('react-dom'),
    Main     = require('./js/main');

ReactDOM.render(
  <Main />,
  document.getElementById('content')
);
