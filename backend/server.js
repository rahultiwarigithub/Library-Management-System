const http = require('http');
const config = require('dotenv').config();
const connectDB = require('./connectDB');
const app = require('./app');

const PORT = process.env.PORT || 5000;
app.set('port', PORT);

// create http server
const server = http.createServer(app);

// establish db connection
connectDB();

// configure app on defined PORT
server.listen(PORT, () => {
    console.log(`Server running ==> PORT: ${PORT}`)
});
