/**
 *
 * This source code has been adapted from the original ReactCSSTransitionGroup
 * available at https://github.com/facebook/react/blob/master/src/addons/transitions/ReactCSSTransitionGroup.js
 *
 * It's intentention is to provide similar functionality, however instead of updating classes,
 * to use "style" objects to update a component's style.
 *
 * @typechecks
 * @providesModule ReactStyleTransitionGroupChild
 */

'use strict';

var React = require('react');

var assign = require('react/lib/Object.assign');

var ReactTransitionGroup = React.createFactory(
  require('react/lib/ReactTransitionGroup')
);
var ReactStyleTransitionGroupChild = React.createFactory(
  require('./ReactStyleTransitionGroupChild')
);

var ReactStyleTransitionGroup = React.createClass({
  displayName: 'ReactStyleTransitionGroup',

  propTypes: {
    transitionAppear: React.PropTypes.bool,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      transitionAppear: false,
      transitionEnter: true,
      transitionLeave: true
    };
  },

  _wrapChild: function(child) {
    // We need to provide this childFactory so that
    // ReactStyleTransitionGroupChild can receive updates to enter and
    // leave while it is leaving.
    return ReactStyleTransitionGroupChild(
      {
        transitionStyles: child.props.transitionStyles,
        appear: this.props.transitionAppear,
        enter: this.props.transitionEnter,
        leave: this.props.transitionLeave
      },
      child
    );
  },

  render: function() {
    return (
      ReactTransitionGroup(
        assign({}, this.props, {childFactory: this._wrapChild})
      )
    );
  }
});

module.exports = ReactStyleTransitionGroup;
