'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function () {
      var pinCode    = this.props.pinCode,
          trackingNr = this.props.trackingNr,
          widgetUrl  = `${window.mapilary.widgetUrl}#/timeslots/${trackingNr}?pinCode=${pinCode}`,
          trackerUrl = `${window.mapilary.trackerUrl}#/add/${trackingNr}?pinCode=${pinCode}&device=ios`;

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
                  </div>
                  <div className="apps">
                    <a className="link" target="_blank" href={trackerUrl}>
                      <div className="widget app">
                        <span className="text">Open in tracker</span>
                      </div>
                    </a>
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
