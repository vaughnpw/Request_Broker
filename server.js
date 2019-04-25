
const express = require('express');
const cors = require('cors');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 5000; 
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const createServer = () => { 
  const corsOptions = {
    origin: `http://localhost:${port}`
  };

  const server = express(); 
  // for cors preflight
  server.options('*', cors())
  server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // server.get('/_data/resources', (req, res) => {
  //   const itemData = api.getItem()
  //   res.json(itemData)
  // })

  server.get('*', cors(corsOptions), (req, res) => handle(req, res)); 

  server.post('*', cors(corsOptions), (req, res) => handle(req, res)); 

  return server; 
}; 

const server = createServer();

app.prepare()
.then(() => {
  server.listen(port, (err) => { 
    if (err) throw err; 
    console.log(`Ready on http://localhost:${port}`); 
  }); 
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

exports.app = app; 
exports.server = server; 