'use strict';

var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            message: ''
        };
    },
    render: function () {
        return (
            <div className="notification">{this.state.message}</div>
        );
    }
});
