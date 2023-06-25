const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
    console.log("First middleware")
    next()
})

app.get('/', (req, res) => {
    console.log("Second Middleware")
    res.send('Hello World!')
})

app.get('/two', (req, res) => {
    res.send('Hello World! 2')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})