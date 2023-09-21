// Write a response and return it to the client
const respondXML = (request, response, status, xmlStr) => {
  const headers = {
    'Content-Type': 'text/xml',
  };

  response.writeHead(status, headers);
  response.write(xmlStr);
  response.end();
};

const getSuccess = (request, response) => {
  let xmlResponse = '<response>';
  xmlResponse += '<message>This is a successful response</message>';
  xmlResponse += '</response>';

  respondXML(request, response, 200, xmlResponse);
};

const getBadRequest = (request, response, params) => {
  if (params.valid) {
    let xmlResponse = '<response>';
    xmlResponse += '<message>This request has the required parameters</message>';
    xmlResponse += '</response>';
    respondXML(request, response, 200, xmlResponse);
    return;
  }

  let xmlResponse = '<response>';
  xmlResponse += '<message>Missing valid query parameter set to true</message>';
  xmlResponse += '<id>badRequest</id>';
  xmlResponse += '</response>';

  respondXML(request, response, 400, xmlResponse);
};

const getUnauthorized = (request, response, params) => {
  if (params.loggedIn === 'yes') {
    let xmlResponse = '<response>';
    xmlResponse += '<message>You have successfully viewed the content</message>';
    xmlResponse += '</response>';
    respondXML(request, response, 200, xmlResponse);
    return;
  }

  let xmlResponse = '<response>';
  xmlResponse += '<message>Missing loggedIn query parameter set to yes</message>';
  xmlResponse += '<id>unauthorized</id>';
  xmlResponse += '</response>';

  respondXML(request, response, 401, xmlResponse);
};

const getForbidden = (request, response) => {
  let xmlResponse = '<response>';
  xmlResponse += '<message>You do not have access to this content</message>';
  xmlResponse += '<id>forbidden</id>';
  xmlResponse += '</response>';

  respondXML(request, response, 403, xmlResponse);
};

const getInternalErr = (request, response) => {
  let xmlResponse = '<response>';
  xmlResponse += '<message>Internal server error, something went wrong</message>';
  xmlResponse += '<id>internalError</id>';
  xmlResponse += '</response>';

  respondXML(request, response, 500, xmlResponse);
};

const getNotImplemented = (request, response) => {
  let xmlResponse = '<response>';
  xmlResponse += '<message>A get request for this page has not been implemented yet. ';
  xmlResponse += 'Check again later for updated content.</message>';
  xmlResponse += '<id>notImplemented</id>';
  xmlResponse += '</response>';

  respondXML(request, response, 501, xmlResponse);
};

const notFound = (request, response) => {
  let xmlResponse = '<response>';
  xmlResponse += '<message>The page you are looking for was not found</message>';
  xmlResponse += '<id>notFound</id>';
  xmlResponse += '</response>';

  respondXML(request, response, 404, xmlResponse);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternalErr,
  getNotImplemented,
  notFound,
};
