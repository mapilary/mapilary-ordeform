(function (mapilary) {
    mapilary.Spinner = React.createClass({
        getInitialState: function() {
            return {
                loading: false
            };
        },
        render: function () {
            var spinnerClass = this.state.loading ? 'loading' : '';
            return (
                <div id="spinner" className={ spinnerClass }></div>
            );
        }
    });
})(window.mapilary = window.mapilary || {});
