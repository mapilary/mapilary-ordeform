var mapilary = {};
mapilary.data = {};

mapilary.OrderForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name    = React.findDOMNode(this.refs.name),
        surname = React.findDOMNode(this.refs.surname),
        address = React.findDOMNode(this.refs.address),
        shopIdx = this.refs.shop.state.value,
        note    = React.findDOMNode(this.refs.note);

    var shop = shops[shopIdx];

    this.props.onOrderSubmit({
      name: name.value.trim(),
      surname: surname.value.trim(),
      shopName: shop[0],
      shopAddress: [shop[1], shop[2]].join(','),
      consigneeAddress: address.value.trim(),
      note: note.value.trim()
    });
    // React.findDOMNode(this.refs.consignee).value = '';
    // React.findDOMNode(this.refs.address).value = '';
    return;
  },
  render: function() {
    return (
      <form className="orderForm" onSubmit={this.handleSubmit}>
        <ul className="form consignee">
          <li className="nameRow clearfix">
            <div className="half">
              <label for="name">Name</label>
              <input className="icon nameIcon" name="name" type="text" placeholder="Name" defaultValue="Martin" ref="name" />
            </div>
            <div className="half">
              <label for="surname">Surname</label>
              <input name="surname" type="text" placeholder="Surname" defaultValue="Fowler" ref="surname" />
            </div>
          </li>
          <li>
            <label for="address">Address</label>
            <input className="icon addressIcon" name="address" type="text" placeholder="Address" defaultValue="Gemerská 4, Bratislava" ref="address" />
          </li>
          <li>
        <label for="note">Note <span className="note">(optional)</span></label>
        <textarea className="icon infoIcon" name="note" placeholder="Note" ref="note" /></li>
        </ul>
        <ul className="form shop">
          <li>
            <label for="shops">Merchant</label>
            <Select name="shops" options={this.props.shops} ref="shop" />
            </li>
          <li><input className="btn order-btn" type="submit" value="Order now" /></li>
        </ul>
      </form>
    );
  }
});

mapilary.ShopBox = React.createClass({
  getInitialState: function() {
    return { shops: [] };
  },
  handleOrderSubmit: function(order) {
    var url = 'http://localhost:8887/postorder';
    console.log(order);
    autoDispatch(order)
    .done(function () {
      console.log('Objednavka uspesne odoslana');
    })
    .fail(function (jqXHR, status, err) {
      console.error('Odosielanie objednavky zlyhalo: ', err.toString());
    });
  },
  componentDidMount: function() {
    var that = this;
    var shopsSelect = shops.map(function (shop, idx) {
      return {
        value: idx,
        label: shop[0]
      };
    });
    that.setState({ shops: shopsSelect });
  },
  render: function() {
    return (
      <div className="shopBox">
        <h1>New Order</h1>
        <mapilary.OrderForm shops={this.state.shops} onOrderSubmit={this.handleOrderSubmit} />
      </div>
    );
  }
});