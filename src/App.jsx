import { useEffect, useState } from "react";
import Search from "./components/Search";
import Units from "./components/Units";
import axios from "axios";
import MainWeatherCard from "./components/MainWeatherCard";
import StatsRow from "./components/StatsRow";
import DailyWeatherCard from "./components/DailyWeatherCard";
import HourlyForecastCard from "./components/HourlyForecastCard";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null); // weather API internal errors
  const [selectedDay, setSelectedDay] = useState("");
  const [unitSettings, setUnitSettings] = useState({
    temperature: "°",
    windSpeed: "km/h",
    precipitation: "mm",
  });
  const [location, setLocation] = useState({
    lat: 34.784953,
    lon: 32.087717,
    timezone: "Asia/Jerusalem",
    cityName: "Tel Aviv",
    cityCountry: "Israel",
  }); // the selected city, default: Tel Aviv, Israel
  const [searchError, setSearchError] = useState(""); // no city matched

  //console.log("Unit settings:", unitSettings);

  // Get a shortcut for the days in the week
  const getShortDayName = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" });

  const getDayName = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });

  // Update selected day whenever weather changes
  useEffect(() => {
    if (weather) {
      setSelectedDay(getDayName(weather.current_weather.time));
    }
  }, [weather]);

  // Fetch weather whenever the location changes
  useEffect(() => {
    const fetchingForecast = async () => {
      try {
        setError(null);
        setWeather(null);
        const response = await axios(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}` +
            "&current_weather=true" +
            "&hourly=temperature_2m,relative_humidity_2m,precipitation,weathercode" +
            "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode" +
            `&timezone=${location.timezone}`
        );
        console.log(response);
        const data = response.data;
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError(err.message || "Failed to fetch weather data");
      }
    };

    fetchingForecast();
  }, [location]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!weather) return <div className="text-white">Loading...</div>;

  // Extract the icons according to the weather code according to the Api
  const getWeather = (code) => {
    if (code === 0)
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-overcast.webp"
        />
      );
    if ([1, 2, 3].includes(code))
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-partly-cloudy.webp"
        />
      );
    if ([45, 48].includes(code))
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-fog.webp"
        />
      );
    if ([51, 53, 55].includes(code))
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-drizzle.webp"
        />
      );
    if ([56, 57].includes(code))
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-drizzle.webp"
        />
      );
    if ([61, 63, 65].includes(code))
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-rain.webp"
        />
      );
    if ([66, 67].includes(code))
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-rain.webp"
        />
      );
    if ([71, 73, 75, 77].includes(code))
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-snow.webp"
        />
      );
    if ([80, 81, 82].includes(code))
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-rain.webp"
        />
      );
    if ([85, 86].includes(code))
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-snow.webp"
        />
      );
    if (code === 95)
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-storm.webp"
        />
      );
    if ([96, 99].includes(code))
      return (
        <img
          className="w-[60px] 2xl-[100px]"
          src="/weather-app-project/weather-app-main/assets/images/icon-storm.webp"
        />
      );
    return "❔";
  };

  // Handle a location selected from Search (autocomplete or search button)
  const HandleLocationSelect = (loc) => {
    setLocation(loc);
    setSearchError(""); // clear "no results" message if there was one
  };

  const currentTime = new Date(weather.current_weather.time);
  console.log(currentTime);

  // Find the current hour index
  let idx = weather.hourly.time.findIndex((t) => {
    const hour = new Date(t);
    return (
      hour.getFullYear() === currentTime.getFullYear() &&
      hour.getMonth() === currentTime.getMonth() &&
      hour.getDate() === currentTime.getDate() &&
      hour.getHours() === currentTime.getHours()
    );
  });
  console.log(idx);

  // Fallback to 0 if not found
  if (idx === -1) idx = 0;

  // Format function for hours like "3 PM"
  const formatHour = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

  // Extract hourly values for now
  const humidity = weather.hourly.relative_humidity_2m[idx];
  const precipitation = weather.hourly.precipitation[idx];
  const wind = weather.current_weather.windspeed;
  const temp = weather.current_weather.temperature;

  // Prepare daily data
  const dailyForecast = weather.daily.time.map((date, i) => ({
    date,
    day: getShortDayName(date),
    max: Math.round(weather.daily.temperature_2m_max[i]),
    min: Math.round(weather.daily.temperature_2m_min[i]),
    code: getWeather(weather.daily.weathercode[i]),
  }));

  console.log(getDayName(weather.current_weather.time));

  // console.log(dailyForecast);

  // Getting the current hour and the 7 next hours of the selected day
  const currentHour = new Date(weather.current_weather.time).getHours();

  const selectedDayIndex = weather.daily.time.findIndex((date) => {
    const dayName = getDayName(date);
    return dayName === selectedDay;
  });

  const startIndex = selectedDayIndex * 24 + currentHour;

  const next8Hours = weather.hourly.time
    .slice(startIndex, startIndex + 8)
    .map((time, i) => ({
      hour: formatHour(time),
      temp: Math.round(weather.hourly.temperature_2m[startIndex + i]),
      icon: getWeather(weather.hourly.weathercode[startIndex + i]),
    }));

  console.log(next8Hours);

  // Conversions Units
  const convertTemp = (tempC) =>
    unitSettings.temperature === "°F" ? (tempC * 9) / 5 + 32 : tempC;

  const convertWind = (windKm) =>
    unitSettings.windSpeed === "mph" ? windKm / 1.609 : windKm;

  const convertPrecip = (precipMm) =>
    unitSettings.precipitation === "in" ? precipMm / 25.4 : precipMm;

  return (
    <div className="bg-neutral-900 overflow-x-hidden min-h-screen w-full h-full flex flex-col gap-5 px-4 sm:px-6 2xl:px-20">
      <div className="w-full max-w-[1500px] mx-auto flex flex-col md:grid gap-5 px-1 lg:px-8 xl:max-w-[2000px] 2xl:max-w-[2400px] 2xl:px-12 2xl:gap-30">
        {/* Header: logo + units button */}
        <div className="flex justify-between gap-4 mt-8 w-full items-center 2xl:mt-12">
          <img
            src="./weather-app-main/assets/images/logo.svg"
            className="w-[120px] md:w-[197px] lg:w-[250px] 2xl:w-[380px]"
            alt=""
          />
          <Units
            setUnitSettings={setUnitSettings}
            unitSettings={unitSettings}
          />
        </div>
        {/* Title + Search */}
        <div className="flex flex-col gap-12 items-center mb-4 md:mb-1 lg:mb-3 lg:mt-10 w-full 2xl:gap-20">
          <h1 className="text-white text-center text-[40px] md:text-4xl font-semibold font-heading lg:text-[50px] xl:text-[60px] 2xl:text-[120px] 2xl:max-w-[70%]">
            How's the sky looking today?
          </h1>
          <Search
            onLocationSelect={HandleLocationSelect}
            setSearchError={setSearchError}
          />

          {/* Show "No search results found!" under search input */}
          {searchError && (
            <p className="text-white text-center text-lg mt-2 font-medium">
              {searchError}
            </p>
          )}
        </div>
        {/* Only show weather data if there is NO search error */}
        {!searchError && (
          <div
            className="w-full flex flex-col items-center md:items-start mt-3 gap-7 md:mt-8 md:grid-rows-[auto_auto_auto] md:grid-cols-[minmax(0,1fr)_260px] md:grid md:gap-7 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_minmax(380px,450px)] 2xl:grid-cols-[minmax(0,1fr)_minmax(420px,670px)] 2xl:gap-14"
            style={{
              gridTemplateAreas: `
              "main sidebar"
              "stats sidebar"
              "daily sidebar"
            `,
            }}
          >
            <MainWeatherCard
              className="md:[grid-area:main]"
              timezone={`${location.cityName}, ${location.cityCountry}`}
              date={weather.current_weather.time}
              temperature={`${convertTemp(temp).toFixed(0)}${
                unitSettings.temperature
              }`}
              icon={getWeather(weather.current_weather.weathercode)}
            />
            <div className="flex flex-wrap justify-center gap-3 md:[grid-area:stats] md:flex-nowrap 2xl:gap-8 2xl:w-full 2xl:justify-start">
              <StatsRow
                statName="Feels Like"
                stat={`${convertTemp(temp).toFixed(0)}${
                  unitSettings.temperature
                }`}
              />
              <StatsRow statName="Humidity" stat={`${humidity}%`} />
              <StatsRow
                statName="Wind"
                stat={`${convertWind(wind).toFixed(0)} ${
                  unitSettings.windSpeed
                }`}
              />
              <StatsRow
                statName="Precipitation"
                stat={`${convertPrecip(precipitation).toFixed(0)} ${
                  unitSettings.precipitation
                }`}
              />
            </div>
            <div className="flex flex-col gap-8 mt-3 md:[grid-area:daily] 2xl:gap-10">
              <h3 className="text-white text-[18px] lg:text-[23px] xl:text-[28px] font-medium 2xl:text-[45px]">
                Daily forecast
              </h3>
              <div className="flex flex-wrap gap-3 justify-center 2xl:gap-6 2xl:w-full 2xl:flex-nowrap">
                {dailyForecast.map((dayData, i) => (
                  <DailyWeatherCard
                    key={i}
                    day={dayData.day}
                    icon={dayData.code}
                    min={`${Math.round(convertTemp(dayData.min))}${
                      unitSettings.temperature
                    }`}
                    max={`${Math.round(convertTemp(dayData.max))}${
                      unitSettings.temperature
                    }`}
                  />
                ))}
              </div>
            </div>
            <HourlyForecastCard
              className="md:[grid-area:sidebar]"
              getWeather={getWeather}
              hoursArray={next8Hours}
              weatherDay={getDayName(weather.current_weather.time)}
              tempUnit={unitSettings.temperature}
              setSelectedDay={setSelectedDay}
              convertTemp={convertTemp}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
