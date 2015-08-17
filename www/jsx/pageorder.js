(function (mapilary) {
    var Notify = mapilary.Notify,
        Form = mapilary.Form;

    mapilary.OrderPage = React.createClass({
        getInitialState: function() {
            var baseUrl;
            switch (window.location.hostname) {
                case 'localhost':
                  baseUrl = 'http://localhost:4444/';
                  break;
                case 'demo.mapilary.com':
                  baseUrl = 'https://api.mapilary.com/test/';
                  break;
                case 'dev.mapilary.com':
                  baseUrl = 'https://api.mapilary.com/dev/';
                  break;
                case 'test.mapilary.com':
                  baseUrl = 'https://api.mapilary.com/test/';
                  break;
            }

          return {
              baseUrl: baseUrl
          };
        },

        getDefaultProps: function () {
            var shops = mapilary.shops.map(function (shop, idx) {
              return {
                value: idx,
                label: shop[0]
              };
            });

            return {
                shops: shops,
                address: 'Gemerska 4, Bratislava'
            };
        },
        componentDidMount: function() {
          if (!this.state.baseUrl) {
              this.onError(new Error('Unsupported domain: ' + window.location.hostname));
          }
        },
        onOrderSubmit: function (order) {
            var that = this;
            this.props.onOrderSubmit(order, { baseUrl: this.state.baseUrl })
            .done(function (resp) {
                  that.clearError()
                  that.refs.orderForm.reset();
            })
            .fail(function (jqXHR, status, err) {
                 var failMsg = err.toString();
                 if (jqXHR.status === 0) {
                     failMsg = 'No response from server';
                 }
                 if (jqXHR.responseJSON) {
                     failMsg = jqXHR.responseJSON.message || err.toString();
                 }
                  that.onError(new Error('Order failed: ' + failMsg));
            });
        },
        clearError: function () {
            this.refs.notify.setState({message: ''});
        },
        onError: function (err) {
            this.refs.notify.setState({message: err.message});
        },
        render: function () {
            return (
                <div className="page">
                  <div className="headr">
                    <span className="btn btn-settings" onClick={this.props.onSettingsBtnClick}></span>
                    <h2>Checkout</h2>
                    <Notify ref="notify"/>
                  </div>
                  <Form address={this.props.address} shops={this.props.shops} onError={this.onError} onOrderSubmit={this.onOrderSubmit} ref="orderForm"/>
                </div>
            );
        }
    });
})(window.mapilary = window.mapilary || {});
