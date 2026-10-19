const fs = require('fs');
const http = require('http');

////////////////////////////
// FILES
// Blocking, synchronous way
/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
const hello = 'Hello world';
console.log(hello);

// Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
  console.log(data);
});
*/
 ////////////////////////////
// CREATING A SERVER
const server = http.createServer((req, res) => {
    res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})