(function (mapilary) {
    mapilary.Notify = React.createClass({
        getInitialState: function() {
            return {
                message: ''
            };
        },
        render: function () {
            return (
                <div className="notification">{this.state.message}</div>
            );
        }
    });
})(window.mapilary = window.mapilary || {});
