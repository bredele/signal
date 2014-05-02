
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
      peer.remote(offer);
    });


    socket.on('master offer', function(offer) {
      peer.remote(offer);
      peer.answer();
    });

    peer.once('ready', function() {
      socket.emit(type + ' offer', peer.connection.localDescription);
    });

    
    socket.on('slave', function() {
      type = 'master';
      peer.offer();
    });

    // NOTE: can we create an offer even before the handshake?
    socket.emit('join', room);
  };
};
