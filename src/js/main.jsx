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
    var page = 'login';
    console.log(mapilary.accessToken, mapilary.tokenExpire)
    if (mapilary.accessToken && moment().isBefore(moment.unix(mapilary.tokenExpire))) {
        page = 'form';
    }

    return {
        page: page
    };
  },
  getNewTimeout: function (now) {
      return moment(now || new Date()).add(10, 'm').toDate();
  },
  getDefaultProps: function () {
      var now = moment();
      return {
          deadline: moment(now).add(1, 'h').toDate(),
          voting: false,
          onlineSince: new Date(),
          timeout: 10
      };
  },
  handleOrderSubmit: function(order, options) {
    var that = this;
    this.refs.spinner.setState({ loading: true });
    order.deadline = this.props.deadline;

    return mapilaryFnc.createDelivery(order, {
        accessToken: mapilary.accessToken,
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
    this.setProps(props);
    this.showFormPage();
  },
  handleLogout: function () {
    mapilary.tokenExpire = null;
    mapilary.accessToken = null;
    sessionStorage.removeItem('form.accessToken');
    sessionStorage.removeItem('form.tokenExpire');
    this.showLoginPage();
  },
  handleLogin: function (auth) {
    mapilary.tokenExpire = auth.tokenExpire;
    mapilary.accessToken = auth.accessToken;
    sessionStorage.setItem('form.accessToken', auth.accessToken);
    sessionStorage.setItem('form.tokenExpire', auth.tokenExpire.unix());

    this.setState({page: 'form'});
  },
  showLoginPage: function () {
    this.setState({page: 'login'});
  },
  showSettingsPage: function () {
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
            <SettingsPage onSet={this.handleSettings} deadline={this.props.deadline} onlineSince={this.props.onlineSince} timeout={this.props.timeout} />
            <OrderPage baseUrl={this.state.baseUrl} onLogoutBtnClick={this.handleLogout} onOrderSubmit={this.handleOrderSubmit} />
            <ConfirmationPage onBackBtnClick={this.showFormPage} trackingNr={this.state.trackingNr} pinCode={this.state.pinCode}/>
        </div>
        <Spinner ref="spinner"/>
      </div>
    );
  }
});
