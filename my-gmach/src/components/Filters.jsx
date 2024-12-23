import { Filter, Search, Star } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { gmachContext } from "../App";



function calculateDistance(userLat, userLon, pointLat, pointLon) {
  const R = 6371; // 
  const toRad = (value) => (value * Math.PI) / 180; // convert to radians 
  const dLat = toRad(pointLat - userLat);
  const dLon = toRad(pointLon - userLon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(userLat)) *
      Math.cos(toRad(pointLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}


function Filters() {

  const elementSelectCity = useRef();
  const elementSelectCategory = useRef();
  const elementSelectRating = useRef();
  const elementSelectDistance = useRef();

  const [cityOption, setCityOption] = useState([]);
  const [categoriesOption, setCategoriesOption] = useState([]);

  const {userLocation, setUserLocation} = useContext(gmachContext)
  const {  setGmachList } = useContext(gmachContext);

  const fetchOption = () => {
    fetch("http://localhost:3005/categories-and-city-option")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCityOption(data["resultsCity"].map((rew) => rew["city"]));
        setCategoriesOption(
          data["resultsCategories"].map((rew) => rew["name"])
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );}
  

  useEffect(() => {
    fetchOption()
    getUserLocation()}, []);

  const searchFilters = useRef({
    city: "",
    category: "",
    distance:"",
    rating: "",
  });

  function getGmachList() {
    const url = new URL("http://localhost:3005/getGmachList");

    // Adding the parameters to the URL, if the field is empty (""), a NULL value will be inserted
    searchFilters.current.city &&
      url.searchParams.append("city", searchFilters.current.city);
    searchFilters.current.category &&
      url.searchParams.append("category", searchFilters.current.category);
    searchFilters.current.rating &&
      url.searchParams.append("rating", searchFilters.current.rating);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((gmach) => {
          gmach.latitude = parseFloat(gmach.latitude);
          gmach.longitude = parseFloat(gmach.longitude);
          gmach.rating = parseFloat(gmach.rating);
        });
        if(searchFilters.current.distance && userLocation.lat && userLocation.lon){
           data = data.filter(gmach=>{
            return calculateDistance(userLocation.lat, userLocation.lon, gmach.latitude, gmach.longitude) <= searchFilters.current.distance
          })
        }
        setGmachList([...data]);
      })
      .catch((error) => {
        console.error("Error fetching gmach list:", error);
      });
  }

  return (
    <div className="w-full py-4 px-6 bg-gray-50">
      <div
        className="max-w-7xl mx-auto"
        // style={{ backgroundColor: "rgb(73, 51, 243)" }}
      >
        <div dir="rtl" className="border border-primary bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 ml-2" />
              <select
                ref={elementSelectCity}
                className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => {
                  searchFilters.current.city = e.target.value;
                  getGmachList();
                }}
              >
                <option value="">כל הערים</option>
                {cityOption.map((city, i) => (
                  <option value={city} key={i}>{city}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <select
                ref={elementSelectCategory}
                className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => {
                  searchFilters.current.category = e.target.value;
                  getGmachList();
                }}
              >
                <option value="">כל הקטגוריות</option>
                {categoriesOption.map((category, i) => (
                  <option value={category} key={i}>{category}</option>
                ))}
              </select>
            </div>


            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 ml-2" />
              <select
                ref={elementSelectDistance}
                className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => {
                  searchFilters.current.distance = e.target.value;
                  getGmachList();
                }}
              >
                <option value="">כל מרחק</option>
                {["1", "3", "5", "10", "20","50","100"].map((kilometer, i) => (
                  <option value={kilometer} key={i}>{kilometer} ק"מ</option>
                ))}
              </select>
            </div>


            <div className="flex items-center">
              <Star className="h-5 w-5 text-gray-400 ml-2" />
              <select
                ref={elementSelectRating}
                className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => {
                  searchFilters.current.rating = e.target.value;
                  getGmachList();
                }}
              >
                <option value="">כל הדירוגים</option>
                <option value="4">4+ כוכבים</option>
                <option value="3">3+ כוכבים</option>
              </select>
            </div>

            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="חיפוש גמ״ח..."
                  className="block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
