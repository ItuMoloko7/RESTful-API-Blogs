const PORT = 443
const http = require('https')
const fs = require('fs')
const now = new Date()
const current = now.toLocaleString();
const app = require('./index')
const server = http.createServer({
    key: fs.readFileSync('Keys/privatekey.pem'),
    cert: fs.readFileSync('Keys/certificate.pem')
}, app)
const { connect } = require('./db/db.js')
connect()
server.listen(PORT, () =>{
    console.log(`Server started on Port: ${PORT} @ ${current}`)
})