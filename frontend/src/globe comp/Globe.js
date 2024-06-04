import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import globeMod from './globe.module.css'

const Globe = () => {
    const [featureData, setFeatureData] = useState([]);
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;
        mapboxgl.accessToken = 'pk.eyJ1IjoiemF5YWgtY29ydHJpZ2h0IiwiYSI6ImNsd3FneGwydjAyMjQyanB3b3l2OXp2bWEifQ.Jhy-CgyyaasKNUAxHb9Sww';
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [-98.5795, 39.8283],
            bearing: 0,
            pitch: 70,
            zoom: 4,
            projection: 'globe'
        });

        map.current.on('load', () => {
            // Load an image to use as an icon
            map.current.loadImage(
                'https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg',
                (error, image) => {
                    if (error) throw error;
                    map.current.addImage('ring', image);
                }
            );
            
            console.log(featureData);
            map.current.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': featureData
                }
            });
            
            map.current.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'minzoom': 3,
                'layout': {
                    'icon-image': 'ring',
                    'icon-size': 0.1,
                    'text-anchor': 'top'
                }
            });
        });

        fetch('/api/features')
            .then(res => res.json())
            .then(data => {
                setFeatureData(data);
            });
    }, []);

    useEffect(() => {
        map.current.on("load", () => {
            map.current.getSource('points').setData({
                'type': 'FeatureCollection',
                'features': featureData
            });
        })
    }, [featureData]);

    return <div ref={mapContainer} style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}></div>;
};

export default Globe;
