'use strict';

var React       = require('react'),
    ReactDOM    = require('react-dom'),
    Notify      = require('./notify'),
    mapilaryFnc = require('./func');

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            username: '',//localStorage.getItem('form.username'),
            company: ''//localStorage.getItem('form.company')
        };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var that     = this,
            username = ReactDOM.findDOMNode(this.refs.username),
            company  = ReactDOM.findDOMNode(this.refs.company),
            password = ReactDOM.findDOMNode(this.refs.password);

        mapilaryFnc.getToken({
            username: username.value,
            company: company.value,
            password: password.value,
            baseUrl: mapilary.baseUrl
        }).then(function (auth) {
            password.value = '';
            //localStorage.setItem('form.username', username.value);
            //localStorage.setItem('form.company', company.value);
            that.props.onLogin(auth);
        }).fail(function (err) {
            var response = err.responseJSON || {},
                message = response.message || 'Wrong username or password';
            that.refs.notify.setState({message: message});
        });
    },
    render: function () {
        return (
            <div id="page-login">
            <div className="headr">
                <h2>Login</h2>
                <Notify ref="notify"/>
            </div>
            <form className="form-container" onSubmit={this.handleSubmit}>
              <ul className="form">
                  <li className="row">
                    <label>Username</label>
                    <div className="input-group">
                        <span className="icon input-icon name-icon"></span>
                        <input name="username" className="form-control username" type="text" placeholder="username" defaultValue={this.props.username} ref="username" autoFocus="true" required="true"/>
                    </div>
                  </li>
                  <li className="row">
                    <label>Company</label>
                    <div className="input-group">
                        <span className="icon input-icon address-icon"></span>
                        <input name="company" className="form-control company" type="text" placeholder="company" defaultValue={this.props.company} ref="company" required="false"/>
                    </div>
                  </li>
                <li className="row">
                  <label>Password</label>
                  <div className="input-group">
                    <span className="icon input-icon padlock-icon"></span>
                    <input name="password" className="form-control password" type="password" placeholder="password" ref="password" required="true"/>
                  </div>
                </li>
              </ul>
              <ul className="form submit">
                  <li className="row">
                    <input className="btn btn-login" type="submit" value="Login" />
                  </li>
              </ul>
            </form>
            </div>
        );
    }
});
