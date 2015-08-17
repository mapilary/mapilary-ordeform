(function (mapilary) {
    mapilary.ConfirmationPage = React.createClass({
        render: function () {
            return (
                <div className="page page-confirmation">
                    <div className="headr">
                      <h2>Thank you!</h2>
                    </div>
                      <ul className="form submit">
                        <li className="row">
                            <input className="btn btn-back" onClick={this.props.onBackBtnClick} type="submit" value="New Order"/>
                        </li>
                      </ul>
                </div>
            );
        }
    });
})(window.mapilary = window.mapilary || {});
