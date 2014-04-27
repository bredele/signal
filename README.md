signal
======

**[peer](http://github.com/bredele/peer)** plugin to connect two remote peer connections through websocket.


## Installation

with [component](http://github.com/component/component):

	$ component install bredele/signal


## Usage

  signal is a one liner to exchange peer session descriptions and initialize a remote peer to peer connection.

```js
var peer = require('peer');
var chat = peer();

// connect to room foo
chat.use(signal('foo'));
```

  use it with **[channel](http://github.com/bredele/channel)** to create a chat application in a couple of lines:

```js
var chat = peer();

chat.use(channel('foo'));
chat.use(signal('foo'));

chat.send('hello world');
```

  signal uses the [socket.io](http://socket.io/) client so make sure you required it before (see [example](https://github.com/bredele/signal/blob/master/test/)).


## Signaling server


  signal needs a signaling server to exchange metadata (sessions, ice candidates, etc) in order to initiate a remote peer to peer connection. You'll find a dummy implementation [here](https://github.com/bredele/signal/blob/master/test/).

  Here's ths signaling spec used by signal:
  - `join` join room
  - `candidate` get master and slave ice candidate and broadcast it
  - `master offer` get session description from master peer and broadcast it
  - `slave offer` get session description from slave peer and broadcast it

  The spec will probably change in the future to support rooms with more than two peer.

## License

The MIT License (MIT)

Copyright (c) 2014 Olivier Wietrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.