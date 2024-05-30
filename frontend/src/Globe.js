import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const Globe = () => {
    const [featureData, setFeatureData] = useState([]);

    useEffect(() => {
        mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v11',
            zoom: 1.5,
            center: [-98.5795, 39.8283],
            bearing: 0,
            pitch: 70,
            zoom: 4,
            projection: 'globe'
        });

        map.on('load', () => {
            // Load an image to use as an icon
            map.loadImage(
                'https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg',
                (error, image) => {
                    if (error) throw error;
                    map.addImage('ring', image);
                }
            );

            fetch('/api/features')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setFeatureData(data);
                    map.addSource('points', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': data
                        }
                    });
                    map.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'points',
                        'minzoom': 3,
                        'layout': {
                            'icon-image': 'ring',
                            'icon-size': 0.1,
                            // 'text-field': ['get', 'name'],
                            // 'text-offset': [0, 1.5],
                            'text-anchor': 'top'
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });
    }, []);

    return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}></div>;
};

export default Globe;
