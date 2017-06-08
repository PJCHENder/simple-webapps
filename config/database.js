/**
 * mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
 */
module.exports = {
  development: {
    connection: 'mongodb://localhost:27017/simple_webapps'
  },
  production: {
    connection: process.env.MONGODB_URI
  }
}
