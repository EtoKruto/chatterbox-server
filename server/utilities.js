




exports.send404 = function(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.end('Noot Found');
};

exports.sendRepsonse = function(response, payload, headers = {}, status = 200) {
  if (typeof payload === object && payload !== null) {
    Object.assign(headers, { 'Content-Type': 'application/json' });
    payload = JSON.stringify(payload);
  }
  response.writeHead(status, headers);
  response.end(payload);


};

exports.collectData = function(request, callback) {
  let data = '';
  request.on('data', function(chunk) {
    data += chunk.toString();
  });
  request.on('end', function () {
    const message = JSON.parse(data);
    callback(message);
  });

};

exports.defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10, // Seconds.
  'allow': 'GET, POST, PUT, DELETE, OPTIONS'
};

export default exports;