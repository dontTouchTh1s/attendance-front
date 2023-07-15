import React, {useState} from 'react'
import MapPicker from 'react-google-map-picker'
import './map.css';
import LocationPin from './LocationPin';

function GoogleMap({onChangeLocation}) {
    const DefaultLocation = {lat: 10, lng: 106};
    const DefaultZoom = 10;
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    function handleChangeLocation(lat, lng) {
        setLocation({lat: lat, lng: lng});
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        setDefaultLocation({...DefaultLocation});
        setZoom(DefaultZoom);
    }

    return (
        <>
            <div className="map">

            <MapPicker
                className={'google-map'}
                zoom={zoom}
                mapTypeId="roadmap"
                style={{height: '700px', position: 'relative'}}

                onChangeLocation={(lat, lng) => {onChangeLocation(lat, lng); handleChangeLocation(lat, lng)}}
                onChangeZoom={handleChangeZoom}
                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
                defaultLocation={defaultLocation}>
            </MapPicker>
            </div>
        </>
    )
}

export default GoogleMap;