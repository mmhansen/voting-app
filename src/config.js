const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  port: isProduction ? process.env.PORT : 3001,
  database: isProduction ? 'later' : 'mongodb://localhost/voting-app'
}
