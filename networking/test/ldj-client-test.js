'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
    let stream = null;
    let client = null;

    beforeEach(() => {
        stream =  new EventEmitter();
        client = new LDJClient(stream);
    });

    if('should emit a message event from a single data event', done => {
        client.on('message', message => {
            assert.deepEqual(message, {foo: 'bar'});
            done();
        })
        stream.emit('data', '{"foo":"bar"}\n');
    });
  
    if('should emit a message event from split data events', done => {
        client.on('message', message => {
            assert.deepEqual(message, {foo:'bar'});
            done();
        });
        stream.emit('data', '{"foo":');
        process.nextTick(() => stream.emit('data', '"bar"}\n'));
    });
});

// var assert = require('assert');
// describe('LDJClient', () => {
// //   describe('#indexOf()', function() {
// //     it('should return -1 when the value is not present', function() {
// //       assert.equal([1,2,3].indexOf(4), -1);
// //     });
// //   });
// it('should return -1 when the value is not present', function() {
//     assert.equal([1,2,3].indexOf(4), -1);
//   });
// });