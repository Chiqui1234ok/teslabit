const mongoose = require('mongoose');
const dbName = 'teslabit';
const dbUser = 'santiagogimenez@outlook.com.ar';
const dbPassword = 'Lilolilo10';
const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@ds047207.mlab.com:47207/${dbName}`;

const uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL || MONGODB_URI;

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/'+db, {
mongoose.connect(uristring, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('Succeeded connected to: ' + uristring))
    .catch(err => console.log('ERROR connecting to: ' + uristring + '. ' + err));