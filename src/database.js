const mongoose = require('mongoose');

const uristring = process.env.MONGODB_URI || 'mongodb://localhost/teslabit';

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/'+db, {
mongoose.connect(uristring, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('Succeeded connected to: ' + uristring))
    .catch(err => console.log('ERROR connecting to: ' + uristring + '. ' + err));