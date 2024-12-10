// import { AsyncPaginate } from "react-select-async-paginate";
// import { useState } from "react";
// import { GEO_API_URL, geoApiOptions } from "../../api";
// //2
// const Search = ({ onSearchChange }) => {
//   const [search, setSearch] = useState(null);

//   //5
//   const loadOptions = async (inputValue) => {
//    try {
//         const response = await fetch(
//             `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
//             geoApiOptions
//           );
//         const result = await response.text();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// };
//   const handleOnChange = (searchData) => {
//     setSearch(searchData);
//     onSearchChange(searchData);
//   };

//   return (
//     <AsyncPaginate
//       placeholder="Search for city"
//       debounceTimeout={600}
//       value={search}
//       onChange={handleOnChange}
//       loadOptions={loadOptions} //4 - Added a load options
//     />
//   );
// };

// export default Search;
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    // Mark the function as async
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json(); // Parse JSON instead of text
      return {
        options: result.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error(error);
      return { options: [] }; // Return an empty options array in case of error
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions} // Add loadOptions function here
    />
  );
};

export default Search;