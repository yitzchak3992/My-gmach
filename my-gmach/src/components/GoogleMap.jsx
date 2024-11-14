// import React, { useState, useRef, useContext } from "react";
// import { gmachContext } from "../App";

// const apiKey = "AIzaSyAQUer9qrblVasIpmTUf4q0QOJqn38YjaQ";


// // יש צורך במפתח API של Google Geocoding
// const GOOGLE_API_KEY = 'apiKey';

// async function getCoordinatesFromAddress(address) {
//     try {
//         // קידוד הכתובת ל-URL safe string
//         const encodedAddress = encodeURIComponent(address);
        
//         // בניית כתובת ה-URL לבקשה
//         const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_API_KEY}`;
        
//         // שליחת הבקשה ל-API
//         const response = await fetch(url);
//         const data = await response.json();
        
//         // בדיקה האם התקבלו תוצאות
//         if (data.status === 'OK' && data.results.length > 0) {
//             const location = data.results[0].geometry.location;
//             return {
//                 lat: location.lat,
//                 lng: location.lng,
//                 success: true,
//                 formattedAddress: data.results[0].formatted_address
//             };
//         } else {
//             return {
//                 success: false,
//                 error: 'לא נמצאו תוצאות עבור הכתובת שהוזנה'
//             };
//         }
//     } catch (error) {
//         return {
//             success: false,
//             error: 'אירעה שגיאה בתהליך ההמרה: ' + error.message
//         };
//     }
// }

// const GoogleMap = () => {
//   const { gmachList } = useContext(gmachContext);


//   // מערך של נקודות ציון
//   const locations = [
//     {
//       position: { lat: 31.7683, lng: 35.2137 },
//       title: "ירושלים",
//       description: "עיר הבירה של ישראל. ידועה באתריה ההיסטוריים והדתיים.",
//     },
//     {
//       position: { lat: 32.0853, lng: 34.7818 },
//       title: "תל אביב",
//       description: "המרכז הכלכלי של ישראל. עיר החוף התוססת.",
//     },
//     {
//       position: { lat: 32.794, lng: 34.9896 },
//       title: "חיפה",
//       description: "עיר הנמל הגדולה. ידועה בגני הבהאים ובהר הכרמל.",
//     },
//     {
//       position: { lat: 31.253, lng: 34.7915 },
//       title: "באר שבע",
//       description: "בירת הנגב. מרכז תעשייתי ואקדמי חשוב.",
//     },
//     {
//       position: { lat: 32.3215, lng: 34.8532 },
//       title: "נתניה",
//       description: "עיר החוף היפה. ידועה בחופיה ובטיילת המרשימה.",
//     },
//   ];

//   // מצב עבור חלון המידע הפתוח
//   const [activeMarker, setActiveMarker] = useState(null);
//   const [infoWindowData, setInfoWindowData] = useState(null);
//   const mapRef = useRef(null);
//   const markersRef = useRef({});

//   // פונקציה לטעינת המפה
//   const loadMap = () => {
//     if (!window.google) {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
//       script.async = true;
//       script.defer = true;
//       script.onload = initMap;
//       document.head.appendChild(script);
//     } else {
//       initMap();
//     }
//   };

//   // אתחול המפה
//   const initMap = () => {
//     console.log('@@@@@');
    
//     const map = new window.google.maps.Map(mapRef.current, {
//       zoom: 8,
//       center: { lat: 31.7683, lng: 35.2137 },
//     });

//     // יצירת חלון מידע אחד משותף
//     const infoWindow = new window.google.maps.InfoWindow();

//     // יצירת הסמנים
//     gmachList.forEach((gmach, index) => {

// // דוגמה לשימוש
// async function example(gmach) {
//     const result = await getCoordinatesFromAddress(gmach.address);
    
//     if (result.success) {
//         console.log('קואורדינטות:', result.lat, result.lng);
//         console.log('כתובת מפורמטת:', result.formattedAddress);
//         gmach.latitude = result.lat
//         gmach.longitude = result.lng
//     } else {
//         console.error('שגיאה:', result.error);
//     }
// }
// example(gmach)

// console.log(gmachList);


//       const marker = new window.google.maps.Marker({
//         position:  { lat: gmach.latitude, lng: gmach.longitude },
//         map,
//         title: gmach.description,
//       });

//       markersRef.current[index] = marker;

//       const content = `
//         <div style="direction: rtl; text-align: right; padding: 10px;">
//           <h3 style="margin: 0 0 5px 0; color: #333;">${gmach.category}</h3>
//           <p style="margin: 0; color: #666;">${gmach.description}</p>
//         </div>
//       `;

//       marker.addListener("mouseover", () => {
//         infoWindow.setContent(content);
//         infoWindow.open(map, marker);
//         setActiveMarker(index);
//         setInfoWindowData(gmach);
//       });

//       marker.addListener("mouseout", () => {
//         infoWindow.close();
//         setActiveMarker(null);
//         setInfoWindowData(null);
//       });

//       marker.addListener("click", () => {
//         infoWindow.setContent(content);
//         infoWindow.open(map, marker);
//         setActiveMarker(index);
//         setInfoWindowData(gmach);
//       });
//     });
//   };

//   // טעינת המפה בעת טעינת הקומפוננטה
//   React.useEffect(() => {
//     loadMap();
//     // ניקוי בעת הסרת הקומפוננטה
//     return () => {
//       const scripts = document.getElementsByTagName("script");
//       for (let script of scripts) {
//         if (script.src.includes("maps.googleapis.com")) {
//           script.remove();
//         }
//       }
//     };
//   }, []);

//   return (
//     <div className="map-container">
//       <div
//         ref={mapRef}
//         style={{
//           height: "600px",
//           width: "100%",
//         }}
//       />
//       {/* אופציונלי: רשימת מיקומים לצד המפה */}
//       <div className="locations-list">
//         {gmachList.map((gmach, index) => (
//           <div
//             key={index}
//             className={`location-item ${
//               activeMarker === index ? "active" : ""
//             }`}
//             onMouseEnter={() => {
//               const marker = markersRef.current[index];
//               if (marker) {
//                 window.google.maps.event.trigger(marker, "mouseover");
//               }
//             }}
//             onMouseLeave={() => {
//               const marker = markersRef.current[index];
//               if (marker) {
//                 window.google.maps.event.trigger(marker, "mouseout");
//               }
//             }}
//           >
//             <h4>{gmach.title}</h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GoogleMap;






// import React, { useState, useRef, useEffect } from 'react';

// const GoogleMap = ({ apiKey }) => {
//   const [markers, setMarkers] = useState([]);
//   const [address, setAddress] = useState('');
//   const [activeMarker, setActiveMarker] = useState(null);
//   const mapRef = useRef(null);
//   const geocoderRef = useRef(null);
//   const mapInstanceRef = useRef(null);

//   // נקודות ציון קבועות לדוגמה
//   const initialLocations = [
//     {
//       title: 'ירושלים - כותל מערבי',
//       address: 'הכותל המערבי, ירושלים',
//       description: 'האתר הקדוש ביותר ליהדות'
//     },
//     {
//       title: 'תל אביב - שדרות רוטשילד',
//       address: 'שדרות רוטשילד 1, תל אביב',
//       description: 'השדרה ההיסטורית של תל אביב'
//     }
//   ];

//   // פונקציה להמרת כתובת לקואורדינטות
//   const geocodeAddress = (address, title, description) => {
//     return new Promise((resolve, reject) => {
//       geocoderRef.current.geocode({ address }, (results, status) => {
//         if (status === 'OK') {
//           const location = results[0].geometry.location;
//           resolve({
//             position: { lat: location.lat(), lng: location.lng() },
//             title: title || results[0].formatted_address,
//             description: description || 'נקודת ציון',
//             address: address
//           });
//         } else {
//           reject(new Error(`Geocoding failed: ${status}`));
//         }
//       });
//     });
//   };

//   // פונקציה להוספת נקודת ציון חדשה
//   const addMarker = async (address, title = '', description = '') => {
//     try {
//       const newLocation = await geocodeAddress(address, title, description);
//       setMarkers(prev => [...prev, newLocation]);
      
//       // הזזת המפה לנקודה החדשה
//       mapInstanceRef.current.panTo(newLocation.position);
//       mapInstanceRef.current.setZoom(15);

//       return newLocation;
//     } catch (error) {
//       console.error('Error adding marker:', error);
//       alert('לא הצלחנו למצוא את הכתובת. אנא נסה שוב.');
//     }
//   };

//   // טעינת המפה וה-Geocoder
//   const initMap = () => {
//     const map = new window.google.maps.Map(mapRef.current, {
//       zoom: 13,
//       center: { lat: 31.7683, lng: 35.2137 }
//     });
//     mapInstanceRef.current = map;
    
//     // יצירת Geocoder
//     geocoderRef.current = new window.google.maps.Geocoder();
    
//     // חלון מידע משותף
//     const infoWindow = new window.google.maps.InfoWindow();

//     // הוספת המיקומים ההתחלתיים
//     initialLocations.forEach(loc => addMarker(loc.address, loc.title, loc.description));

//     // מעקב אחרי שינויים במערך הסמנים והצגתם במפה
//     markers.forEach(location => {
//       const marker = new window.google.maps.Marker({
//         position: location.position,
//         map,
//         title: location.title
//       });

//       const content = `
//         <div style="direction: rtl; text-align: right; padding: 10px;">
//           <h3 style="margin: 0 0 5px 0; color: #333;">${location.title}</h3>
//           <p style="margin: 0; color: #666;">${location.description}</p>
//           <p style="margin: 5px 0 0 0; color: #888; font-size: 0.9em;">${location.address}</p>
//         </div>
//       `;

//       marker.addListener('click', () => {
//         infoWindow.setContent(content);
//         infoWindow.open(map, marker);
//       });
//     });
//   };

//   // טעינת ה-API
//   useEffect(() => {
//     if (!window.google) {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geocoding`;
//       script.async = true;
//       script.onload = initMap;
//       document.head.appendChild(script);
//     } else {
//       initMap();
//     }
//   }, [markers]); // מאזין לשינויים במערך הסמנים

//   // טופס להוספת נקודת ציון חדשה
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (address) {
//       await addMarker(address);
//       setAddress(''); // ניקוי הטופס
//     }
//   };

//   return (
//     <div className="map-container">
//       <div className="controls-panel">
//         <form onSubmit={handleSubmit} className="address-form">
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="הכנס כתובת..."
//             className="address-input"
//           />
//           <button type="submit" className="add-button">הוסף נקודת ציון</button>
//         </form>
        
//         {/* רשימת הנקודות */}
//         <div className="markers-list">
//           <h3>נקודות ציון</h3>
//           {markers.map((marker, index) => (
//             <div key={index} className="marker-item">
//               <h4>{marker.title}</h4>
//               <p>{marker.address}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div
//         ref={mapRef}
//         className="map"
//         style={{ height: '600px', width: '100%' }}
//       />
//     </div>
//   );
// };

// export default GoogleMap;







import React, { useState, useRef, useContext, useEffect } from "react";
import { gmachContext } from "../App";

const apiKey =  "AIzaSyAQUer9qrblVasIpmTUf4q0QOJqn38YjaQ"

async function getCoordinatesFromAddress(address) {
    try {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng,
                success: true,
                formattedAddress: data.results[0].formatted_address
            };
        } else {
            console.error('Geocoding error:', data.status);
            return {
                success: false,
                error: 'לא נמצאו תוצאות עבור הכתובת שהוזנה'
            };
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return {
            success: false,
            error: 'אירעה שגיאה בתהליך ההמרה: ' + error.message
        };
    }
}

const GoogleMap = () => {
    const { gmachList } = useContext(gmachContext);
    const [activeMarker, setActiveMarker] = useState(null);
    const [infoWindowData, setInfoWindowData] = useState(null);
    const mapRef = useRef(null);
    const markersRef = useRef({});
    const [geocodedGmachList, setGeocodedGmachList] = useState([]);

    // פונקציה לקידוד כל הכתובות
    const geocodeAllAddresses = async () => {
        const geocodedList = [];
        for (const gmach of gmachList) {
            const result = await getCoordinatesFromAddress(gmach.address);
            if (result.success) {
                geocodedList.push({
                    ...gmach,
                    latitude: result.lat,
                    longitude: result.lng
                });
            }
        }
        setGeocodedGmachList(geocodedList);
        return geocodedList;
    };

    const initMap = (geocodedLocations) => {
        if (!window.google || geocodedLocations.length === 0) return;

        const map = new window.google.maps.Map(mapRef.current, {
            zoom: 8,
            center: { lat: 31.7683, lng: 35.2137 },
        });

        const infoWindow = new window.google.maps.InfoWindow();

        geocodedLocations.forEach((gmach, index) => {
            if (!gmach.latitude || !gmach.longitude) return;

            const marker = new window.google.maps.Marker({
                position: { lat: gmach.latitude, lng: gmach.longitude },
                map,
                title: gmach.description,
            });

            markersRef.current[index] = marker;

            const content = `
                <div style="direction: rtl; text-align: right; padding: 10px;">
                    <h3 style="margin: 0 0 5px 0; color: #333;">${gmach.category}</h3>
                    <p style="margin: 0; color: #666;">${gmach.description}</p>
                </div>
            `;

            marker.addListener("mouseover", () => {
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
                setActiveMarker(index);
                setInfoWindowData(gmach);
            });

            marker.addListener("mouseout", () => {
                infoWindow.close();
                setActiveMarker(null);
                setInfoWindowData(null);
            });

            marker.addListener("click", () => {
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
                setActiveMarker(index);
                setInfoWindowData(gmach);
            });
        });
    };

    const loadMap = async () => {
        if (!window.google) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
            script.async = true;
            script.defer = true;
            script.onload = async () => {
                const locations = await geocodeAllAddresses();
                initMap(locations);
            };
            document.head.appendChild(script);
        } else {
            const locations = await geocodeAllAddresses();
            initMap(locations);
        }
    };

    useEffect(() => {
        loadMap();
        return () => {
            const scripts = document.getElementsByTagName("script");
            for (let script of scripts) {
                if (script.src.includes("maps.googleapis.com")) {
                    script.remove();
                }
            }
        };
    }, [gmachList]);

    return (
        <div className="map-container">
            <div
                ref={mapRef}
                style={{
                    height: "600px",
                    width: "100%",
                }}
            />
            <div className="locations-list">
                {geocodedGmachList.map((gmach, index) => (
                    <div
                        key={index}
                        className={`location-item ${activeMarker === index ? "active" : ""}`}
                        onMouseEnter={() => {
                            const marker = markersRef.current[index];
                            if (marker) {
                                window.google.maps.event.trigger(marker, "mouseover");
                            }
                        }}
                        onMouseLeave={() => {
                            const marker = markersRef.current[index];
                            if (marker) {
                                window.google.maps.event.trigger(marker, "mouseout");
                            }
                        }}
                    >
                        <h4>{gmach.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoogleMap;