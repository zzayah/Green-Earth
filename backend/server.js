const express = require('express')
const app = express()
const fs = require('fs')
const csv = require('csv-parser')


app.get('/api/features', (req, res) => {
    const csvData = [];
    fs.createReadStream('./us-state-capitals.csv')
        .pipe(csv())
        .on("data", (row) => {
            const { name, description, latitude, longitude } = row;
            const data = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [parseFloat(longitude), parseFloat(latitude)]
                },
                'properties': {
                    'name': name,
                    'description': description
                }
            };
            csvData.push(data);
        })
        .on("end", () => {
            res.json(csvData)
        })
})


app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
