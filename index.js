
// Slice references

var slice = [].slice;

/**
 * Create an instance listening on `el` or the window object.
 *
 * @param {Element?} el
 * @return {Function}
 * @api public
 */

module.exports = function(el) {
  el = el || window;  
  var pressed = {};
  
  // Watch `el` for keyboard events
  
  el.addEventListener('keydown', keydown);
  el.addEventListener('keyup', keyup);
  
  function keydown(e) {
    pressed[e.keyCode] = true;
    mod(e);
  }
  
  function keyup(e) {
    pressed[e.keyCode] = false;
    mod(e);
  }
  
  // Check modifier keys
  
  function mod(e) {
    pressed.alt = e.altKey;
    pressed.ctrl = e.ctrlKey;
    pressed.meta = e.metaKey;
    pressed.shift = e.shiftKey;
  }
  
  /**
   * Check if `codes` are currently pressed.
   *
   * All arguments must be pressed, but if an argument is an array, it's enough
   * when one of the codes in that array is pressed.
   *
   * @param {{Array[Number|String]|String}..}
   * @return {Boolean}
   * @api public
   */
  
  function check() {
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (Array.isArray(arg)) {
        var one = false;
        for (var j = 0; j < arg.length; j++) {
          var code = arg[j];
          if (pressed[code]) one = true;
        }
        if (!one) return false;
      } else {
        var code = arg;
        if (!pressed[code]) return false;
      }
    }
    return true;
  }
  
  /**
   * Stop listening for events.
   *
   * @api public
   */

  check.unbind = function() {
    el.removeEventListener('keydown', keydown);
    el.removeEventListener('keyup', keyup);
  };
  
  return check;
};
