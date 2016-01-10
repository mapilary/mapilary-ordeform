'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function () {
        var timeslotsLink = window.mapilary.widgetUrl + '#/timeslots/' + this.props.trackingNr + '?pinCode=' + this.props.pinCode;
        return (
            <div className="page" id="page-confirmation">
                <div className="headr">
                  <h2>Order sent</h2>
                </div>
                <div className="form-container">
                  <p className="success">We have recieved your order successfully.</p>
                  <div className="tracking">
                    <table className="tracking-info">
                      <tbody>
                        <tr>
                          <td className="tracking-desc">Tracking Nr.:</td>
                          <td><span className="trackingNr">{this.props.trackingNr}</span></td>
                        </tr>
                        <tr>
                          <td>PIN:</td>
                          <td><span className="pinCode">{this.props.pinCode}</span></td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="timeslotsLink"><a target="_blank" href={timeslotsLink}>Set timeslots for this delivery</a></p>
                  </div>
                </div>
                <ul className="form submit">
                  <li className="row">
                      <input className="btn btn-submit" onClick={this.props.onBackBtnClick} type="submit" value="New Order"/>
                  </li>
                </ul>
            </div>
        );
    }
});
