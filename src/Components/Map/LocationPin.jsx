import LocationOnIcon from '@mui/icons-material/LocationOn';

function LocationPin({text, onSelectLocation}) {
    return (
        <div onClick={onSelectLocation} className="pin">
            <LocationOnIcon/>
            <p className="pin-text">{text}</p>
        </div>
    );
}

export default LocationPin