require('dotenv/config');
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL_LOCAL)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(error => console.error('Connection to MongoDB failed!'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})

