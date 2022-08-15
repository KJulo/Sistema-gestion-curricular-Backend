const config = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost',
  appRoute: process.env.APP_ROUTE || '/app',
  publicRoute: process.env.PUBLIC_ROUTE || '/public',
  filesRoute: process.env.FILES_ROUTE || '/files',
};

module.exports = config;
