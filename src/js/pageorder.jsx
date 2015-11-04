'use strict';

var React  = require('react'),
    Notify = require('./notify'),
    Form   = require('./form');

module.exports = React.createClass({
    getInitialState: function() {
      return {
          baseUrl: window.mapilary.config.baseUrl
      };
    },

    componentDidMount: function() {
      if (!this.state.baseUrl) {
          this.onError(new Error('Unsupported domain: ' + window.location.hostname));
      }
    },
    onOrderSubmit: function (order) {
        var that = this;
        this.props.onOrderSubmit(order, { baseUrl: this.state.baseUrl })
        .done(function (resp) {
              that.clearError()
              that.refs.orderForm.reset();
        })
        .fail(function (jqXHR, status, err) {
             var failMsg = err.toString();
             if (jqXHR.status === 0) {
                 failMsg = 'No response from server';
             }
             if (jqXHR.responseJSON) {
                 failMsg = jqXHR.responseJSON.message || err.toString();
             }
              that.onError(new Error('Order failed: ' + failMsg));
        });
    },
    clearError: function () {
        this.refs.notify.setState({message: ''});
    },
    onError: function (err) {
        this.refs.notify.setState({message: err.message});
    },
    render: function () {
        return (
            <div className="page">
              <div className="headr">
                <span className="btn btn-logout" onClick={this.props.onLogoutBtnClick}></span>
                <h2>Order delivery</h2>
                <Notify ref="notify"/>
              </div>
              <Form address={this.props.address} shops={this.props.shops} onError={this.onError} onOrderSubmit={this.onOrderSubmit} ref="orderForm"/>
            </div>
        );
    }
});
