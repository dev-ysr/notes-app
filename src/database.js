const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:fncCpPbWXS6o8B@notes-db-app.9pync.mongodb.net/notes-db-app?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));