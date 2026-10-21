const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

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

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    const {query, pathname} = (url.parse(req.url, true));
    
    // Overview page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html'});


        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el
        )).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        console.log(cardsHtml);


        res.end(output);

        // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, { 'content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
        

        // API
    } else if (pathName === '/api') {

        res.writeHead(200, { 'content-type': 'application/json'});
        res.end(data);

        // Not Found
    } else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})