# React - Style Transition Group

```
BETA v0.0.0
```

The `StyleTransitionGroup` is very similar to React's [`CSSTransitionGroup`](https://github.com/facebook/react/blob/master/src/addons/transitions/ReactCSSTransitionGroup.js), but it uses style updates instead of class updates. If your're unfamilar with React's `CSSTransitionGroup`, Facebook has written a great set of [documentation](http://facebook.github.io/react/docs/animation.html) that explains it's use and more about animation in general as it pertains to React.

The `CSSTransitionGroup` alters classes during the entry and exit parts of a component's lifecycle by watching browser transition events in order to apply classes in a specific order. This technique however requires the CSS attributes for those classes be written ahead of time.

Sometimes however, those attributes need to be dynamically generated at run time and this is where `StyleTransitionGroup` comes in. Instead of passing in a `transitionName` to the `<ReactCSSTransitionGroup>`, the `<ReactStyleTransitionGroup>` requires a `transitionStyles` object to be passed to the child components at render. These styles can be calculated and therefore can by dynamic based on a variety of information.

# Example

The example below is a theoretical menu of vertical items that have transition timing & transform values relevant to the number of items being drawn.

```js
var ReactStyleTransitionGroup = require( 'react-style-transition-group' );

var menuClass = React.createClass( {

  // ...

  render: function() {
    var navItems = this.props.navItems.map( function( navItem, index ) {
      var transitionTiming = ( ( index + 1 ) * 200 ) + 'ms';
      var transitionStyles = {
        enter: {
          transition: 'transform ' + transitionTiming + ' ease, opacity ' + transitionTiming + ' ease',
          transform: 'translateY(-' + ( ( index + 1 ) * 100 ) + '%)',
          opacity: '0'
        },
        enterActive: {
          transform: 'translateY(0)',
          opacity: '1'
        },
        leave: {
          transition: 'opacity 0.2s ease',
          opacity: '1'
        },
        leaveActive: {
          opacity: '0'
        }
      };

      return (
        <MenuItem key={ 'menuItem-' + index } transitionStyles={ transitionStyles }>{ navItem }</MenuItem>
      );
    }, this );
    
    return (
      <ReactStyleTransitionGroup component="ul">
        { ( this.props.open ) ?
          navItems
        : null }
      </ReactStyleTransitionGroup>
    );
  }

} );
```

The `transitionStyles` prop takes a particular shape of object that represents the styles that will be applied during specific times at the component's lifecycle.

```js
var transitionStyles = {
  enter: {
    // ... component is about to enter, timing is key
  },
  enterActive: {
    // ... component has been painted, how will animate?
  },
  leave: {
    // ... component is about to leave, timing is key
  },
  leaveActive: {
    // ... component styles to transition to before being unmounted
  }
}
```

The style attributes themselves follow the inline style format as described in React's [documentation](http://facebook.github.io/react/tips/inline-styles.html).

# Install

With [npm](https://npmjs.org) do:

```
npm install git://github.com/adambbecker/react-style-transition-group.git
```

And require it just like other components:

```js
var ReactStyleTransitionGroup = require( 'react-style-transition-group' );
```

# License

MIT
