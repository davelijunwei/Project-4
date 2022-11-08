const mongoose = require('mongoose')

mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    console.log('mongodb connected!')
  }
)
