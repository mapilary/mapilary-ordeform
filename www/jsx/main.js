(function (mapilary) {
    var Spinner = mapilary.Spinner,
        SettingsPage = mapilary.SettingsPage,
        OrderPage = mapilary.OrderPage,
        ConfirmationPage = mapilary.ConfirmationPage;

    mapilary.OrderForm = React.createClass({
      getInitialState: function() {
        return {
            page: 'form'
        };
      },
      getDefaultProps: function () {
          return {
              deadline: moment().add(1, 'h').toDate(),
              voting: false,
              onlineSince: new Date()
          };
      },
      handleOrderSubmit: function(order, options) {
        var that = this;
        this.refs.spinner.setState({ loading: true });

        order.deadline = this.props.deadline;
        var accessToken;
        if (localStorage['dispatcher.access_token']) {
            accessToken = JSON.parse(localStorage['dispatcher.access_token']);
        } else {
            accessToken = localStorage['access_token'];
        }

        var result;
        if (this.props.voting) {
            order.onlinesince = this.props.onlineSince;
            result = mapilary.fnc.publishDispatch(order, {
                accessToken: accessToken,
                baseUrl: options.baseUrl
            });
        } else {
            result = mapilary.fnc.autoAssign(order, {
                accessToken: accessToken,
                baseUrl: options.baseUrl
            });
        }

        return result.done(function () {
            that.setState({page: 'confirm'});
        })
        .always(function () {
            that.refs.spinner.setState({ loading: false });
        });
      },
      handleSettings: function (props) {
        this.setProps(props);
        this.showFormPage();
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
            <Spinner ref="spinner"/>
            <div className="pagewrap">
                <SettingsPage onSet={this.handleSettings} deadline={this.props.deadline} onlineSince={this.props.onlineSince}/>
                <OrderPage baseUrl={this.state.baseUrl} onSettingsBtnClick={this.showSettingsPage} onOrderSubmit={this.handleOrderSubmit} />
                <ConfirmationPage onBackBtnClick={this.showFormPage} />
            </div>
          </div>
        );
      }
    });
})(window.mapilary = window.mapilary || {});
