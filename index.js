const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const multer = require('multer')

// Create Express App
const app = express()

// // BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))

// Static folder
app.use(express.static('./public'))

// Multer upload config
const upload = multer({
  dest: './public/uploads/',
  limits:{
    fileSize: 1000000
  },
})

// Get home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', upload.single('file-to-upload'), (req, res, next) => {
  if (!req.file) {
    console.error(`No file selected`)
    return res.send({
      success: false
    })
  } else {
    console.log(`File uploaded`)
    res.send({
      success: true,
      file: req.file,
    })
  }
})

// Server
app.listen(3000, () => console.log('Server started on port 3000'))
