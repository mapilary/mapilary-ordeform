'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="page page-confirmation">
                <div className="headr">
                  <h2>Order sent</h2>
                </div>
                <div className="tracking-info">
                  <p className="success">We have recieved your order successfully.</p>
                  <ul className="tracking-data">
                    <li>Tracking Nr.: <span className="trackingNr">{this.props.trackingNr}</span></li>
                    <li>PIN: <span className="pinCode">{this.props.pinCode}</span></li>
                  </ul>
                </div>
                <ul className="form submit">
                  <li className="row">
                      <input className="btn btn-back" onClick={this.props.onBackBtnClick} type="submit" value="New Order"/>
                  </li>
                </ul>
            </div>
        );
    }
});
