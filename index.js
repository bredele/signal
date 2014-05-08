
/**
 * Modules dependencies.
 * @api private
 */

var trace = require('trace')('signal');


/**
 * Signal plugin.
 *
 * Connect two remote peer through
 * socket.io (no ice trickle).
 *
 * Examples:
 *
 *   var chat = peer();
 *   chat.use(signal('room'));
 *
 * @param {String} room
 * @param {String} address optional
 * @api public
 *
 * @see  http://github.com/bredele/peer
 */

module.exports = function signal(room, address) {

  // initialize socket
  
  var socket = io.connect(address);

  return function(peer) {
    var type = 'slave';
    peer.create();
    
    socket.on('slave offer', function(offer) {
      trace('receive answer');
      peer.remote(offer);
    });

    socket.on('master offer', function(offer) {
      trace('receive offer');
      peer.remote(offer);
      peer.answer();
    });

    peer.once('ready', function() {
      trace('send local session description');
      socket.emit(type + ' offer', peer.connection.localDescription);
    });

    socket.on('slave', function() {
      type = 'master';
      trace('set peer as ' + type);
      peer.offer();
    });

    // NOTE: can we create an offer even before the handshake?
    socket.emit('join', room);
  };
};
