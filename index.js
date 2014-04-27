
/**
 * Signal plugin.
 *
 * Connect two remote peer through
 * socket.io.
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
    peer.create();

    // set ice candidate
    
    socket.on('candidate', function(candidate) {
      peer.ice(candidate);
    });

    // send ice candidate
    
    peer.on('candidate', function(candidate) {
      socket.emit('candidate', candidate);
    });

    // get answer from slave
    
    socket.on('slave offer', function(offer) {
      peer.remote(offer);
    });


    // get offer from master
    
    socket.on('master offer', function(offer) {
      peer.remote(offer);
      peer.answer(function(token) {
        peer.local(token);
        socket.emit('slave offer', token);
      });
    });

    // slave is connected
    
    socket.on('slave', function() {
      peer.offer(function(offer) {
        socket.emit('master offer', offer);
      });
    });

    // NOTE: can we create an offer even before the handshake?
    socket.emit('join', room);
  };
};
