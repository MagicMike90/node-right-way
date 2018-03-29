'use strict';
const zmq = require('zeromq');

// Create subscriber endpoint.
const subscriber = zmq.socket('sub');

// Subscribe to all messages
subscriber.subscribe('');

// Handle messages form the publisher.
subscriber.on('message',data => {
    const message = JSON.parse(data);
    const date = new Date(message.timestamp);
    console.log(`File ${message.file} change at ${data}`);
});

// Connect to publisher.
subscriber.connect("tcp://localhost:60400");