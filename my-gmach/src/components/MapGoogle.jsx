import React, {useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useContext } from "react";
import { gmachContext } from "../App";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;  

// console.log("API Key:", apiKey);

const MapGoogle = () => {
  const { gmachList, userLocation} = useContext(gmachContext);
  // const userLocation = useContext(gmachContext).userLocation;
  const [selectedLocation, setSelectedLocation] = useState(null);


  // Loads the Google Maps JS API
  // if (!apiKey) {
  //   console.error(
  //     "Google Maps API Key is missing. Check your .env configuration."
  //   );
  // }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    language: "he", // Set the language to Hebrew
    region: "IL", // Set the region to Israel
  });
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const center =
    userLocation.lat && userLocation.lon
      ? { lat: userLocation.lat, lng: userLocation.lon }
      : { lat: 31.7767, lng: 35.2345 };

  return (
    <GoogleMap
      center={center}
      zoom={10}
      mapContainerStyle={{ width: "100%", height: "500px" }}
    >
      {gmachList.map((gmach, idx) => (
        <Marker
          key={idx}
          position={{ lat: gmach.latitude, lng: gmach.longitude }}
          onClick={() => setSelectedLocation(gmach)}
        />
      ))}
      {selectedLocation && (
        <InfoWindow
          position={{
            lat: selectedLocation.latitude,
            lng: selectedLocation.longitude,
          }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div>
            <h2>{selectedLocation.name}</h2>
            <p>{selectedLocation.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
export default MapGoogle;
