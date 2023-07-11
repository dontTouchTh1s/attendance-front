import Api from '../Api';
export default function locationTracker(geoOptions) {

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error, geoOptions);
    } else {
        console.log("Geolocation not supported");
    }

    async function success(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        let response = await Api.post("/attendance-leave/update-location", {'lat': lat, 'lng': lng});
        console.log(response.data);
        return ({lat: lat, lng: lng});
    }

    function error(error) {
        console.log(error);
    }

}