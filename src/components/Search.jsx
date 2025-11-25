import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Search = ({ onLocationSelect, setSearchError }) => {
  const [inputValue, setInputValue] = useState(""); // User input
  const [suggestions, setSuggestions] = useState([]); // DropDown suggestions
  const [highlightIndex, setHighlightIndex] = useState(-1); // DropDown keyboard

  // Handle typing (autoComplete)
  const handleChange = async (e) => {
    setInputValue(e.target.value);
    setSearchError(""); // clear "no results" when typing again

    const trimmedValue = e.target.value.trim();
    if (trimmedValue === "") {
      setSuggestions([]);
      return; // STOP
    }

    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        trimmedValue
      )}&count=10&language=en&format=json`;

      console.log("Fetching:", url); // <--- CHECK IF THIS PRINTS

      const res = await axios.get(url);
      let results = res.data.results || [];

      console.log("API RESPONSE:", res.data); // <---- THIS MUST PRINT

      // 1. Keep only cities starting with what user typed
      results = results.filter((city) =>
        city.name.toLowerCase().startsWith(trimmedValue.toLowerCase())
      );

      // 2. Remove duplicates (same city)
      const uniqueMap = new Map();
      results.forEach((city) => {
        const key = `${city.name}_${city.country}`;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, city);
        }
      });

      // 3. Convert back to array & take first 5
      const uniqueResults = Array.from(uniqueMap.values()).slice(0, 5);

      // 4. Save suggestions
      setSuggestions(uniqueResults || []);
    } catch (err) {
      console.error("Autocomplete error:", err);
      setSuggestions([]);
    }
  };

  // When user clicks on a city from dropdown
  const handleSelectSuggestion = (city) => {
    setInputValue(`${city.name}, ${city.country}`);
    setSuggestions([]);
    setSearchError("");

    onLocationSelect({
      lat: city.latitude,
      lon: city.longitude,
      timezone: city.timezone || "auto",
      cityName: city.name,
      cityCountry: city.country,
    });
  };

  // When user clicks the Search button
  const handleSubmit = async () => {
    const query = inputValue.trim();
    if (!query) {
      setSearchError("Please enter a location");
      return;
    }

    try {
      setSearchError("");
      const res = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1&language=en&format=json`
      );

      const results = res.data.results || [];
      if (results.length === 0) {
        setSuggestions([]);
        setSearchError("No search results found!");
        return;
      }

      const city = results[0];
      setInputValue(`${city.name}, ${city.country}`);
      setSuggestions([]);

      onLocationSelect({
        lat: city.latitude,
        lon: city.longitude,
        timezone: city.timezone || "auto",
        cityName: city.name,
        cityCountry: city.country,
      });
    } catch (err) {
      console.error("Error searching location:", err);
      setSearchError("No search results found!");
    }
  };

  // handling keyboard arrows
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0) {
        handleSelectSuggestion(suggestions[highlightIndex]);
      } else {
        handleSubmit(); // not using the dropdown suggetions, typing full city name an enter
      }
    }
  };

  return (
    <div className="relative flex flex-col max-w-sm items-center gap-4 justify-center md:flex-row 2xl:max-w-5xl 2xl:gap-10">
      <div className="relative bg-neutral-800 rounded-xl">
        {/* Icon */}
        <img
          src="./weather-app-main/assets/images/icon-search.svg"
          alt="Search"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-70 2xl:w-[50px] 2xl:h-[35px]"
        />

        {/* Input */}
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a place..."
          className="pl-12 w-sm h-[50px] md:min-w-[370px] lg:min-w-[500px] xl:min-w-[580px] border-none text-[20px] text-white md:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:min-w-[1000px] 2xl:text-[38px] 2xl:h-[100px] 2xl:pl-16 placeholder:text-white/70" // add padding-left so text doesn't overlap icon
        />

        {/* DROPDOWN */}
        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 top-full mt-2 bg-neutral-800 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto 2xl:max-h-72">
            {suggestions.map((city, i) => {
              return (
                <li
                  key={city.id}
                  className={`px-4 py-2 text-white cursor-pointer ${
                    i === highlightIndex ? "bg-neutral-600" : "bg-neutral-800"
                  } hover:bg-neutral-700 text-white text-[20px] lg:text-[25px] 2xl:text-[30px]`}
                  onClick={() => handleSelectSuggestion(city)}
                >
                  {city.name}, {city.country}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {/* Search Button */}
      <Button
        className="bg-blue-500 rounded-xl text-white font-normal h-[50px] text-[20px] border-none cursor-pointer w-full md:max-w-[120px] xl:text-[25px] 2xl:h-[90px] 2xl:text-[43px] 2xl:max-w-[220px]"
        type="button"
        variant="outline"
        onClick={handleSubmit}
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
