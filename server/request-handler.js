/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
//request - client
//i am the server - send the response back /behind the scence
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10, // Seconds.
  'allow': 'GET, POST, PUT, DELETE, OPTIONS'
};

var messages = [];
var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/
  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 404;
  // The outgoing status.
  if (request.method === 'GET') {
    if (request.url === '/classes/messages') {
      console.log('we passed');
      statusCode = 200;
    } else if (request.url === '/pokemon') {
      console.log('we got the pokemon');
      statusCode = 420;
    } else if (request.url === '/OK') {
      console.log('we got the OK');
      statusCode = 100;
    }
  }
  if (request.method === 'DELETE' && request.url === '/classes/messages') {
    statusCode = 440;
  }

  // console.log('Serving request type FOR DELETE????', request.method);

  // console.log('statusCode FOR DELETE????', statusCode);

  let data = '';
  if (request.method === 'POST') {
    if (request.url === '/pokemon') {
      statusCode = 420;
    } else {
      statusCode = 201;
    }
    request.on('data', chunk => {
      data += chunk;
      var parsedData = JSON.parse(data);
      if (JSON.stringify(parsedData) === '{}') {
        statusCode = 418;
      }
      messages.push(parsedData);
    });
    request.on('end', () => {
      response.end();
    });
  }
  //  else if (request.method === 'DELETE') {
  //   statusCode = 440;
  // }
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  console.log('statusCode now is:', statusCode);
  response.writeHead(statusCode, headers);
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end(JSON.stringify(messages));
};
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
module.exports.requestHandler = requestHandler;
