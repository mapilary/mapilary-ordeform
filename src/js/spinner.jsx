'use strict';

var React  = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            loading: false
        };
    },
    render: function () {
        var spinnerClass = this.state.loading ? 'loading' : '';
        return (
            <div id="spinner" className={ spinnerClass }></div>
        );
    }
});
