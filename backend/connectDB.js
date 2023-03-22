const mongoose = require('mongoose');

mongoose.set('strictQuery', true);          // 'stictQuery' just to suppress warning

/* function to connet to the database */
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database connected successfully ==> HOST: ${connect.connection.host}, DATABASE: ${connect.connection.name}`);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;