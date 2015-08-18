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
                timeout = React.findDOMNode(this.refs.timeout).value,
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
                deadline: deadline.toDate(),
                timeout: timeout
            });
        },
        toggleVoting: function () {
            if (!this.isVotingEnabled) {
                $('.voting-group input').removeAttr('disabled');
                this.isVotingEnabled = true;
            } else {
                $('.voting-group input').attr('disabled', 'disabled');
                this.isVotingEnabled = false;
            }
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
                        <li className="row clearfix">
                            <div className="voting no-select">
                                <div className="slideThree">
                                    <input type="checkbox" defaultValue="None" onChange={this.toggleVoting} id="voting" ref="voting" />
                                    <label htmlFor="voting"></label>
                                </div>
                            </div>
                            <h3 className="section-head">Voting</h3>
                        </li>
                        <li className="voting-group">
                            <div className="row">
                                <label>Online since</label>
                                <input type="datetime-local" step="1" defaultValue={moment(this.props.onlineSince).format('YYYY-MM-DDTHH:mm:ss')} ref="onlineSince" disabled/>
                            </div>
                            <div className="row">
                                <label>Timeout <span className="note">(minutes)</span></label>
                                <input type="number" min="1" max="60" step="1" defaultValue={this.props.timeout} ref="timeout" disabled/>
                            </div>
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
