(function (mapilary) {
    var Notify = mapilary.Notify;

    mapilary.SettingsPage = React.createClass({
        onError: function (err) {
            this.refs.notify.setState({message: err.message});
        },
        handleSubmit: function (e) {
            e.preventDefault();
            var deadline = moment(React.findDOMNode(this.refs.deadline).value, 'YYYY-MM-DDTHH:mm:ss'),
                voting =  React.findDOMNode(this.refs.voting).checked,
                onlineSince = moment(React.findDOMNode(this.refs.onlineSince).value, 'YYYY-MM-DDTHH:mm:ss');

            if (!deadline.isValid()) {
                this.onError(new Error('Deadline is not valid'));
                return;
            }

            if (voting && !onlineSince.isValid()) {
                this.onError(new Error('Online since is not valid'));
                return;
            }

            this.props.onSet({
                voting: voting,
                onlineSince: onlineSince.toDate(),
                deadline: deadline.toDate()
            });
        },
        toggleVoting: function () {
            $('.voting-group').slideToggle(100);
        },
        render: function () {
            return (
                <div className="page page-settings">
                    <div className="headr">
                      <h2>Settings</h2>
                      <Notify ref="notify"/>
                    </div>
                  <form className="form-container" onSubmit={this.handleSubmit}>
                      <ul className="form">
                        <li className="row">
                            <label>Deadline</label>
                            <input className="deadline" step="1" type="datetime-local" defaultValue={moment(this.props.deadline).format('YYYY-MM-DDTHH:mm:ss')} ref="deadline" />
                        </li>
                        <li className="row">
                            <label>Voting</label>
                            <div className="slideThree">
                            	<input type="checkbox" defaultValue="None" onChange={this.toggleVoting} id="voting" ref="voting" />
                            	<label htmlFor="voting"></label>
                            </div>
                        </li>
                        <li className="row voting-group" style={{display:'none'}}>
                            <label>Online since</label>
                            <input type="datetime-local" step="1" defaultValue={moment(this.props.onlineSince).format('YYYY-MM-DDTHH:mm:ss')} ref="onlineSince" />
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
})(window.mapilary = window.mapilary || {});
