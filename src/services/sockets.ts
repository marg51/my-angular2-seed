var io = require('socket.io-client')

export const createSocket = (params) => io('http://localhost:4052', params);