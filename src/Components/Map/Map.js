import React, {useEffect, useRef, useState} from "react";
import '@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css';
import nmp_mapboxgl from '@neshan-maps-platform/mapbox-gl';

const defaultZoom = 10;

function Map({locationRef}) {
    const mapContainer = useRef();
    const [location, setLocation] = useState(locationRef.current);
    useEffect(() => {
        const map = new nmp_mapboxgl.Map({
            mapKey: "web.c4040600604040f89f28cee478f2cb24",
            mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
            mapTypeControllerOptions: {show: false},
            zoom: defaultZoom,
            center: location,
            container: mapContainer.current,

        });

        const marker = new nmp_mapboxgl.Marker()
            .setLngLat(location)
            .addTo(map);

        map.on('move', () => {
            setLocation(map.getCenter());
            locationRef.current = map.getCenter();
            marker.setLngLat(map.getCenter())
        });


    }, []);

    return (
        <div ref={mapContainer} style={{
            height: '400px',
        }}>
        </div>
    );
}

export default Map;