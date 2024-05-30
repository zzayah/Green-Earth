const express = require('express')
const app = express()

app.get('/api', (req, res) => {
    res.json({ 'users': ['Alice', 'Bob', 'Charlie']})  
})

app.get('/api/features', (req, res) => {
    
})


app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
