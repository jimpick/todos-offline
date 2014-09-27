var http = require('http')
  , port = process.env.PORT || 4126

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World\n')
}).listen(port)

console.log('Server running at http://127.0.0.1:' + port + '/')

