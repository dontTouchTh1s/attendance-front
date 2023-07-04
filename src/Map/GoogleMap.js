import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css';
import LocationPin from './LocationPin';
function GoogleMap(){
    const location = {
        address: 'Iran',
        lat: 32.4279,
        lng: 53.6880,
    }

    return (
        <div className="map">
            <h2 className="map-h2">Come Visit Us At Our Campus</h2>

            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    defaultCenter={location}
                    defaultZoom={7}
                >
                    <LocationPin
                        lat={location.lat}
                        lng={location.lng}
                        text={location.address}
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}
export default GoogleMap;