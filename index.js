const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        } else {
            let map = [];
            const csvData = [];
            fs.createReadStream('./us-state-capitals.csv')
                .pipe(csv())
                .on("data", (row) => {
                    csvData.push(row);
                })
                .on("end", () => {
                    csvData.forEach((csvData) => {
                        var name = csvData.name;
                        var description = csvData.description;
                        var latitude = csvData.latitude;
                        var longitude = csvData.longitude;

                        const data = {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [parseFloat(longitude), parseFloat(latitude)]  // Corrected coordinates
                                },
                                'properties': {
                                    'name': name,
                                    'description': description
                                }
                        };

                        map.push(data);
                    });

                    console.log(map);
                    const modifiedData = data.replace('INSERT_DATA_HERE', JSON.stringify(map));
                    res.send(modifiedData);
                });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});