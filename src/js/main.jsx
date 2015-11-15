'use strict';

var React            = require('react'),
    moment           = require('moment'),
    Spinner          = require('./spinner'),
    mapilaryFnc      = require('./func'),
    LoginPage        = require('./pagelogin'),
    SettingsPage     = require('./pagesettings'),
    OrderPage        = require('./pageorder'),
    ConfirmationPage = require('./pageconfirm');

module.exports = React.createClass({
  getInitialState: function() {
    var page = 'login',
        stockAddress = localStorage.getItem('form.stockAddress'),
        accessToken  = sessionStorage.getItem('form.accessToken'),
        tokenExpire  = sessionStorage.getItem('form.tokenExpire');

    if (accessToken && moment().isBefore(moment.unix(tokenExpire))) {
        page = 'form';
    } else {
        accessToken = null;
        tokenExpire = null;
    }

    return {
        page: page,
        accessToken: accessToken,
        stockAddress: stockAddress || ''
    };
  },
  getNewTimeout: function (now) {
      return moment(now || new Date()).add(10, 'm').toDate();
  },
  handleOrderSubmit: function(order, options) {
    var that = this;
    this.refs.spinner.setState({ loading: true });
    order.stockAddress = this.state.stockAddress;

    return mapilaryFnc.createDelivery(order, {
        accessToken: this.state.accessToken,
        baseUrl: options.baseUrl
    })
    .done(function (delivery) {
        that.setState({
          page: 'confirm',
          pinCode: delivery.pinCode,
          trackingNr: delivery.trackingNr
        });
    })
    .always(function () {
        that.refs.spinner.setState({ loading: false });
    });
  },
  handleSettings: function (props) {
    Object.keys(props).forEach(function (name) {
      localStorage.setItem('form.' + name, props[name]);
    });
    this.setState(props);
    this.showFormPage();
  },
  handleLogout: function () {
    sessionStorage.removeItem('form.accessToken');
    sessionStorage.removeItem('form.tokenExpire');
    this.setState({ accessToken: null });
    this.showLoginPage();
  },
  handleLogin: function (auth) {
    var page = 'form';

    sessionStorage.setItem('form.accessToken', auth.accessToken);
    sessionStorage.setItem('form.tokenExpire', auth.tokenExpire.unix());

    if (!this.state.stockAddress) {
      page = 'settings';
    }

    this.setState({
      page: page,
      accessToken: auth.accessToken
    });
  },
  showLoginPage: function () {
    this.setState({page: 'login'});
  },
  showSettingsPage: function () {
    console.log('[DEBUG]: show settings page');
    this.setState({page: 'settings'});
  },
  showFormPage: function() {
    this.setState({page: 'form'});
  },
  showConfirmPage: function () {
    this.setState({page: 'confirm'});
  },
  render: function() {
    var classes = ['orderform', this.state.page].join(' ');

    return (
      <div className={classes}>
        <LoginPage onLogin={this.handleLogin}/>
        <div className="pagewrap">
            <SettingsPage stockAddress={this.state.stockAddress} onSet={this.handleSettings} onLogout={this.handleLogout} deadline={this.props.deadline} onlineSince={this.props.onlineSince} timeout={this.props.timeout} />
            <OrderPage baseUrl={this.state.baseUrl} onSettingsBtnClick={this.showSettingsPage} onOrderSubmit={this.handleOrderSubmit} />
            <ConfirmationPage onBackBtnClick={this.showFormPage} trackingNr={this.state.trackingNr} pinCode={this.state.pinCode}/>
        </div>
        <Spinner ref="spinner"/>
      </div>
    );
  }
});
