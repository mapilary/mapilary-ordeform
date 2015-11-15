'use strict';

var React      = require('react'),
    ReactDOM   = require('react-dom'),
    Geosuggest = require('react-geosuggest');

module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var trackingNr = ReactDOM.findDOMNode(this.refs.trackingNr),
        name       = ReactDOM.findDOMNode(this.refs.name),
        surname    = ReactDOM.findDOMNode(this.refs.surname),
        address    = this.refs.address,
        phoneNr    = ReactDOM.findDOMNode(this.refs.phoneNr),
        email      = ReactDOM.findDOMNode(this.refs.email),
        note       = ReactDOM.findDOMNode(this.refs.note);

    if (address.state.userInput.length === 0) {
        //this.props.onError(new Error('Please enter valid address'));
        //return;
    }

    this.props.onOrderSubmit({
      trackingNr: trackingNr.value.trim(),
      name: name.value.trim(),
      surname: surname.value.trim(),
      shopName: window.mapilary.config.shopName,
      stockAddress: window.mapilary.config.stockAddress,
      consigneeAddress: address.state.userInput,
      consigneePhoneNr: phoneNr.value.trim(),
      consigneeEmail: email.value.trim(),
      note: note.value.trim()
    });
  },
  reset: function () {
    this.refs.form.reset();
    this.refs.address.setInputValue('');
  },
  render: function() {
    return (
      <form className="form-container" onSubmit={this.handleSubmit} ref="form">
        <ul className="form">
            <li className="row">
              <label>Tracking Nr.</label>
              <div className="input-group">
                <span className="icon input-icon tracking-nr-icon"></span>
                <input name="tracking-nr" className="form-control tracking-nr" type="text" placeholder="PP445511" ref="trackingNr" autoFocus="true" required="true"/>
              </div>
            </li>
          <li className="row row-name clearfix">
            <div className="half">
              <label>Name</label>
              <div className="input-group">
                <span className="icon input-icon name-icon"></span>
                <input name="name" className="form-control name" type="text" placeholder="John" ref="name" required="true"/>
              </div>
            </div>
            <div className="half">
              <label>Surname</label>
              <input name="surname" className="surname" type="text" placeholder="Doe" ref="surname" required="true"/>
            </div>
          </li>
          <li className="row">
          <label>Address</label>
                <Geosuggest
                    ref="address"
                    placeholder="Dunajská 4, Bratislava"
                />
          </li>
          <li className="row">
            <label>Phone Nr.</label>
            <div className="input-group">
                <span className="icon input-icon phone-nr-icon"></span>
                <input name="phone-nr" className="form-control phone-nr" type="tel" placeholder="+421 949 987 654" ref="phoneNr" required="true"/>
            </div>
          </li>
          <li className="row">
            <label>Email</label>
            <div className="input-group">
                <span className="icon input-icon email-icon"></span>
                <input name="email" className="form-control email" type="email" placeholder="john.doe@mail.com" ref="email"/>
            </div>
          </li>
          <li className="row">
            <label>Note <span className="note">(*optional)</span></label>
            <textarea name="note" className="icon info-icon" placeholder="Note" ref="note" />
          </li>
        </ul>
        <ul className="form submit">
            <li className="row">
              <input className="btn btn-order" type="submit" value="Order now" />
            </li>
        </ul>
      </form>
    );
  }
});
