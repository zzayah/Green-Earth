import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import FontawesomeMarker from "mapbox-gl-fontawesome-markers";
import Sandbox from '../sandbox-dial/sandbox'; // Import the Sandbox component
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

const Globe = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const query = new URLSearchParams(window.location.search);
    var addr = query.get('addr') || "1600 Amphitheatre Parkway, Mountain View, CA 94043";

    var coords = [];

    // coordiantes must be imported even though it is not directly used, otherwise the useEffect will not run properly
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addr)}.json?access_token=pk.eyJ1IjoiemF5YWgtY29ydHJpZ2h0IiwiYSI6ImNsd3FneGwydjAyMjQyanB3b3l2OXp2bWEifQ.Jhy-CgyyaasKNUAxHb9Sww`)
            .then(res => res.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    coords = data.features[0].geometry.coordinates;
                    setCoordinates(coords);
                    console.log(`Coordinates: lng: ${coords[0]}, lat: ${coords[1]}`);
                } else {
                    alert("No address found");
                }
            })
            .catch(error => {
                console.error("Error fetching coordinates:", error);
            });
    }, [addr]);

    useEffect(() => {
        if (map.current) return;
        mapboxgl.accessToken = 'pk.eyJ1IjoiemF5YWgtY29ydHJpZ2h0IiwiYSI6ImNsd3FneGwydjAyMjQyanB3b3l2OXp2bWEifQ.Jhy-CgyyaasKNUAxHb9Sww';
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [0, 0],
            projection: 'globe',
        });

        map.current.on('load', () => {
            if (coords.length === 0) return; // Ensure coords is populated

            const popupContent = document.createElement('div');
            popupContent.innerHTML = `<h3>Location Details</h3><p>This is the location you searched for:</p><p>Longitude: ${coords[0]}</p><p>Latitude: ${coords[1]}</p>`;

            const popup = new mapboxgl.Popup({
                offset: 0,
                closeButton: true,
                closeOnClick: false
            })
                .setDOMContent(popupContent)
                .setLngLat([coords[0], coords[1]]) // Ensure this is in [longitude, latitude] format
                .addTo(map.current);
        });

    }, [coords]); // Dependency on coords to update map when coordinates are fetched

    return (
        <div ref={mapContainer} style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}></div>
    );
};

export default Globe;
