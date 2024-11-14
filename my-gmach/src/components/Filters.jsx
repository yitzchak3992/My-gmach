import { Filter, Search, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

function Filters({ gmachList, setGmachList }) {
  const elementSelectCity = useRef();
  const elementSelectCategory = useRef();
  const elementSelectRating = useRef();

  const [cityOption, setCityOption] = useState([]);
  const [categoriesOption, setCategoriesOption] = useState([]);

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

  useEffect(fetchOption, []);

  const searchFilters = useRef({
    city: "",
    category: "",
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
        console.log("Gmach List:", data);
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
                onChange={(e) => {
                  searchFilters.current.city = e.target.value;
                  getGmachList();
                }}
              >
                <option value="">כל הערים</option>
                {cityOption.map((city) => (
                  <option value={city}>{city}</option> //onChange={handleCityChange}
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
