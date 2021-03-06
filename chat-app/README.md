# A Chat App

Description coming soon.

Notes:

To initialize npm, first run "npm init" in the root project directory, complete the questionnaire, and submit.

To install express, run "npm i express"

WebSockets allow for full-duplex communication. This means that communication can be initiated by both the client AND the server. This wasn't available through HTTP requests, since the client always initiated communication with the server.

WebSocket is a separate protocol from HTTP. It allows for a persistent connection between the client and the server.

The Socket.io library provides everything needed to set up the server in node.js scripts AS WELL AS client-side code that can be used in the browser to communicate with the server.

"socket.emit" SENDS events, while "socket.on" RECEIVES events. Both can be used on the client- or server-side.

"io.emit" SENDS events to every connection that is available, not just single connections.

Arguments that are passed in to "socket.emit" are also accessible through "socket.on". To do so, the arguments should have the same name each time they are sent/received.

"Broadcasting" events sends the event to everyone EXCEPT the current client. (Ideal for new users in chat rooms, etc.)

Event acknowledgments require changes on both the client AND server. Whoever emits the event (client or server) sets up a callback function, and whoever receives the event receives the callback function that it in turn needs to call. A good use case for event acknowledgments are for message validations.

The Mustache template library is helpful for rendering message templates to the UI.

Use Moment.js to format time into human-readable formats.

Use QS to parse query strings.

"io.to.emit" sends an event to everyone in a SPECIFIC room without sending it to OTHER rooms

"socket.broadcast.to.emit" sends an event to everyone BUT the specific client within a SPECIFIC chat room.
