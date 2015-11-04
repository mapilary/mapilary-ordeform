'use strict';

var React       = require('react'),
    mapilaryFnc = require('./func');

module.exports = React.createClass({
  getInitialState: function() {
    return { value: 'Gemerská 4, Bratislava' };
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  getRandomAddress: function () {
    this.setState({ value: mapilaryFnc.getRandomAddress() });
  },
  generateRandomAddress: function () {
    var that = this;
    mapilaryFnc.generateRandomAddress(48.132114, 17.108364, 10)
    .done(function (address) {
      that.setState({ value: address });
    });
  },
  render: function () {
    return (
      <div className="address-wrapper no-select">
        <label>Address</label>
        <input className="icon addressIcon" type="text" placeholder="Address" value={this.state.value} onChange={this.handleChange}/>
        <i className="random-address" onClick={this.getRandomAddress}></i>
      </div>
    );
  }
});
