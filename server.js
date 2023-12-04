const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Blockchain = require('./main.js'); // Import the Blockchain class

const port = 3000;

const edgeCoin = new Blockchain();

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const queryParams = querystring.parse(query);

  if (req.method === 'POST' && pathname === '/addData') {
    let data = '';
    
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      const { temperature, humidity } = JSON.parse(data);
      const newBlock = new Block(
        edgeCoin.getLatestBlock().index + 1,
        new Date().toLocaleDateString(),
        { temperature, humidity }
      );

      edgeCoin.addBlock(newBlock);

      console.log('New block added to the blockchain:', newBlock);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Data added to the blockchain successfully.' }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
