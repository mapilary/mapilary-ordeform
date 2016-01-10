'use strict';

var React      = require('react'),
    ReactDOM   = require('react-dom'),
    Geosuggest = require('react-geosuggest'),
    $          = require('jquery'),
    moment     = require('moment'),
    Notify     = require('./notify');

module.exports = React.createClass({
    onError: function (err) {
        this.refs.notify.setState({message: err.message});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var stockAddress = this.refs.stockAddress.state.userInput;
        if (!stockAddress) {
          this.refs.notify.setState({message: 'Stock address cannot be blank'});
          return;
        }
        this.refs.notify.setState({message: ''});
        this.props.onSet({
            stockAddress: stockAddress
        });
    },
    componentDidMount: function () {
      var stockAddress = this.props.stockAddress;
      if (!stockAddress) {
        this.refs.notify.setState({message: 'Please specify address of your stock (warehouse)'});
      }
    },
    render: function () {
        return (
            <div className="page" id="page-settings">
                <div className="headr">
                  <h2>Settings</h2>
                  <Notify ref="notify"/>
                </div>
              <form className="form-container" onSubmit={this.handleSubmit}>
                  <ul className="form">
                    <li className="row">
                    <label>Stock address</label>
                          <Geosuggest
                              ref="stockAddress"
                              initialValue={this.props.stockAddress}
                              placeholder="Dunajská 4, Bratislava"
                          />
                    </li>
                  </ul>
                  <ul className="form submit">
                      <li className="row">
                        <input className="btn btn-order" type="submit" value="Save" />
                      </li>
                  </ul>
              </form>
            </div>
        );
    }
});
