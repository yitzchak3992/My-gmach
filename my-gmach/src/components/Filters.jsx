import { Filter, Search, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// const cityList = ["ירושלים", "בית שמש", "בני ברק"];
// const categoryList = ["כלי עבודה", "מוצרי תינוקות"];

function Filters() {

  const elementSelectCity = useRef()
  const elementSelectCategory = useRef()
  const elementSelectRating = useRef()

  const [cityOption, setCityOption] = useState([])
  const [categoriesOption, setCategoriesOption] = useState([])

  const fetchOption = ()=>{
    fetch("http://localhost:3005/categories-and-city-option")   
     .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setCityOption(data["resultsCity"].map(rew=>rew["city"]))
      setCategoriesOption( data["resultsCategories"].map(rew=>rew["name"]))
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  useEffect(fetchOption,[])

  const searchFilters= useRef({ //[filters, setFilters] = useState({
    city: "",
    category: "",
    rating: "",
  });
  // const searchFilters={ //[filters, setFilters] = useState({
  //   city: "",
  //   category: "",
  //   rating: "",
  // };

  const handleCityChange = (element) => { // useStateטעות אין צורך ב
  // searchFilters.current.city = e.target.value  
  console.log(searchFilters);
  

  };
  // const handleCategoryChange = (element) => {// useStateטעות אין צורך ב
  //   searchFilters.category = element.target.value
  // };

  return (
    <div className="w-full py-4 px-6 bg-gray-50">
      <div
        className="max-w-7xl mx-auto"
        style={{ backgroundColor: "rgb(73, 51, 243)" }}
      >
        Filters
        <div dir="rtl" className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 ml-2" />
              <select
              ref={elementSelectCity}
                className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                // value={searchFilters.current.city}
                onChange={(e) =>{
                  // setFilters({ ...filters, city: e.target.value })
                  searchFilters.current.city = e.target.value  
                  handleCityChange(e)
                                  
                  }
                }
              >
                <option value="" >
                  כל הערים
                </option>
                {cityOption.map((city) => (
                  <option value={city} >{city}</option>//onChange={handleCityChange}
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <select
              ref={elementSelectCategory}
                className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                // value={""}
                // onChange={handleCategoryChange} 
                >
                <option value="">כל הקטגוריות</option>
                {categoriesOption.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <Star className="h-5 w-5 text-gray-400 ml-2" />
              <select
              ref={elementSelectRating}
                className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={""}
                // onChange={(e) =>
                //   setFilters({ ...filters, rating: e.target.value })
                // }
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
