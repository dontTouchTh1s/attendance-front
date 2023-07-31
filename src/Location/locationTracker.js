import Api from '../Api';
import moment from "moment-jalaali";

export default function locationTracker(geoOptions) {

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error, geoOptions);
    } else {
        console.log("Geolocation not supported");
    }

    async function success(position) {
        const lat1 = localStorage.getItem('lat');
        const lng1 = localStorage.getItem('lng');
        const radius = localStorage.getItem('radius');
        let lat2 = position.coords.latitude;
        let lng2 = position.coords.longitude;
        const R = 6371e3; // metres
        const l1 = lat1 * Math.PI / 180; // φ, λ in radians
        const l2 = lat2 * Math.PI / 180;
        const deltaLat = (lat2 - lat1) * Math.PI / 180;
        const deltaLng = (lng2 - lng1) * Math.PI / 180;

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(l1) * Math.cos(l2) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // in metres

        if (d > radius) {
            // User is out of workplace
            console.log('is out');
            if (localStorage.getItem('employeeStatus') !== 'out') {
                console.log(localStorage.getItem('employeeStatus'));
                try {
                    let data = new FormData();
                    data.append('date', moment().format('YYYY-MM-DD HH-mm-ss'))
                    data.append('type', 'leave');
                    let response = await Api.post('attendance-leave/create', data);
                    localStorage.setItem('employeeStatus', 'out');
                    console.log(response);
                } catch (error) {
                    if (error.response) {
                        // handle error response
                        console.log(error.response.data);
                    } else if (error.request) {
                        // handle no response
                        console.log(error.request);
                    } else {
                        // handle other errors
                        console.log('Error', error.message);
                    }
                }
            }
        } else {
            // User is IN of workplace
            console.log('is in');
            if (localStorage.getItem('employeeStatus') !== 'in') {
                try {
                    let data = new FormData();
                    data.append('date', moment().format('YYYY-MM-DD HH-mm-ss'))
                    data.append('type', 'attendance');
                    let response = await Api.post('attendance-leave/create', data);
                    localStorage.setItem('employeeStatus', 'in');
                    console.log(response);
                } catch (error) {
                    if (error.response) {
                        // handle error response
                        console.log(error.response.data);
                    } else if (error.request) {
                        // handle no response
                        console.log(error.request);
                    } else {
                        // handle other errors
                        console.log('Error', error.message);
                    }
                }
            }
        }
    }

    function error(error) {
        console.log(error);
    }

}