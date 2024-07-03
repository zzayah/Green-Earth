import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import FontawesomeMarker from "mapbox-gl-fontawesome-markers";
import Sandbox from '../sandbox-dial/sandbox'; // Import the Sandbox component
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';



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
            center: [0, 0],
            projection: 'globe',
            preserveDrawingBuffer: false
        });

        map.current.on('load', () => {
            map.current.loadImage(
                'https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg',
                (error, image) => {
                    if (error) throw error;
                    map.current.addImage('ring', image);
                }
            );

            const popupContent = document.createElement('div');

            // Render the Sandbox component into the popup content
            ReactDOM.render(<Sandbox width={400} height={300} data={featureData} />, popupContent);

            const popup = new mapboxgl.Popup({
                offset: 0,
                closeButton: false,
                closeOnClick: false
            })
                .setDOMContent(popupContent)
                .setLngLat([0, 0])
                .addTo(map.current);

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
