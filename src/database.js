const mongoose = require('mongoose');
const db = 'teslabit';

mongoose.connect('mongodb://localhost/'+db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));