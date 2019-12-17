const mongoose = require('mongoose');
const db = 'teslabit';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/'+db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));