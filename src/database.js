const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/seiso', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
