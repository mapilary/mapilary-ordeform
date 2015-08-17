(function (mapilary) {
    var AddressInput = mapilary.AddressInput;

    mapilary.Form = React.createClass({
        getInitialState: function() {
           return {
               name: 'John',
               surname: 'Doe',
               shop: null
           };
         },
         onShopChange: function (idx) {
             this.state.shop = idx;
         },
      handleSubmit: function(e) {
        e.preventDefault();
        var name     = React.findDOMNode(this.refs.name),
            surname  = React.findDOMNode(this.refs.surname),
            address  = this.refs.address,
            shopIdx  = this.refs.shop.state.value,
            note     = React.findDOMNode(this.refs.note);

        var shop = mapilary.shops[shopIdx];
        if (!shop) {
          return this.props.onError(new Error('Please select merchant'));
        }

        this.props.onOrderSubmit({
          name: name.value.trim(),
          surname: surname.value.trim(),
          shopName: shop[0],
          shopAddress: [shop[1], shop[2]].join(','),
          consigneeAddress: address.state.value.trim(),
          note: note.value.trim()
        });
      },
      reset: function () {
          this.state.shop = null;
          this.refs.address.getRandomAddress();
      },
      render: function() {
        return (
          <form className="form-container" onSubmit={this.handleSubmit}>
            <ul className="form">
              <li className="row row-name clearfix">
                <div className="half">
                  <label>Name</label>
                  <input className="icon nameIcon name" type="text" placeholder="Name" defaultValue={this.state.name} ref="name" />
                </div>
                <div className="half">
                  <label>Surname</label>
                  <input className="surname" type="text" placeholder="Surname" defaultValue={this.state.surname} ref="surname" />
                </div>
              </li>
              <li className="row">
                <AddressInput ref="address"/>
              </li>
              <li className="row">
                <label>Merchant</label>
                <Select name="shops" value={this.state.shop} onChange={this.onShopChange} options={this.props.shops} ref="shop" />
              </li>
              <li className="row">
                <label>Note <span className="note">(*optional)</span></label>
                <textarea className="icon infoIcon" placeholder="Note" ref="note" />
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
})(window.mapilary = window.mapilary || {});
