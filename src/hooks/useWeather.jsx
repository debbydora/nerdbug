import { useEffect, useState } from "react";
import { API_KEY, INITIAL_CITIES, BASE_URL } from "../Constant";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const useWeather = () => {
  const [cities, setCities] = useState(INITIAL_CITIES);
  const [weatherData, setWeatherData] = useLocalStorage("Cities", []);
  const [favorities, setFavorites] = useLocalStorage("Favorites", []);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchedCity, setSearchedCity] = useState([]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [locate, setLocate] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const availableCities = localStorage.getItem("Cities");

  useEffect(() => {
    if (availableCities.length > 3) {
      return;
    }
    fetchData();
  }, []);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          determineCityFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const determineCityFromCoordinates = async (latitude, longitude) => {
    try {
      setLocate(true);
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=10&appid=${API_KEY}`
      );
      setLocate(false);
      const data = await response.json();
      const city = data[0]?.state?.split(" ")[0];
      if (city) {
        navigate(`/city-details/${city}`, { state: data[0] });
      }
    } catch (error) {
      setLocate(false);
      console.error(error);
    }
  };

  const fetchCity = () => {
    fetch(`${BASE_URL}/weather?q=${searchTerm}&appid=${API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        const updatedWeatherData = {
          id: data.id,
          city: data.name,
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
        };

        setSearchedCity([...searchedCity, updatedWeatherData]);
        setSearchTerm("");
      })
      .catch((error) => console.error(error));
  };

  const fetchData = () => {
    const fetchDataPromises = cities.map((city) =>
      fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`).then(
        (response) => response.json()
      )
    );

    Promise.all(fetchDataPromises)
      .then((data) => {
        const updatedWeatherData = data.map((weather, index) => ({
          id: weather.id,
          city: cities[index],
          temperature: weather.main.temp,
          feelsLike: weather.main.feels_like,
          humidity: weather.main.humidity,
          pressure: weather.main.pressure,
          description: weather.weather[0].description,
          icon: weather.weather[0].icon,
          windSpeed: weather.wind.speed,
        }));
        setWeatherData(updatedWeatherData);
      })
      .catch((error) => console.error(error));
  };

  const removeCity = (cityToRemove) => {
    const updatedCities = cities.filter((city) => city !== cityToRemove);
    setCities(updatedCities);
    setWeatherData(
      weatherData.filter((weather) => weather.city !== cityToRemove)
    );
    setSearchedCity(searchedCity.filter((city) => city.city !== cityToRemove));
  };

  const toggleFavorite = (city) => {
    const alreadyExists = favorities.some((item) => item.city === city.city);
    if (!alreadyExists) {
      const arr = [...weatherData];
      const favoriteIndex = arr.findIndex((item) => item.city === city.city);
      if (favoriteIndex !== -1) {
        const favoriteItem = arr.splice(favoriteIndex, 1)[0];
        const favArr = [...favorities, favoriteItem];
        setFavorites(favArr);
        setWeatherData(arr);
      }
    } else {
      const favArr = favorities.filter((item) => item.city !== city.city);
      setFavorites(favArr);
      const updatedWeatherData = [...weatherData, city];
      setWeatherData(updatedWeatherData);
    }
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const saveNotes = (cityName) => {
    ////mimicking api call
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      localStorage.setItem(`notes_${cityName}`, notes);
      setNotes("");
    }, 3000);
  };

  const deleteNotes = (cityName) => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      localStorage.removeItem(`notes_${cityName}`);
      setNotes("");
    }, 3000);
  };

  const sortedFavorites = [...favorities].sort((a, b) =>
    a.city.localeCompare(b.city)
  );

  const sortedWeatherData = Array.isArray(weatherData)
    ? [...weatherData].sort((a, b) => a.city.localeCompare(b.city))
    : [];

  return {
    cities,
    setCities,
    sortedWeatherData,
    removeCity,
    toggleFavorite,
    sortedFavorites,
    favorities,
    searchTerm,
    handleSearchChange,
    fetchCity,
    weatherData,
    handleLocationClick,
    searchedCity,
    notes,
    handleNotesChange,
    saveNotes,
    deleteNotes,
    saving,
    deleting,
    locate,
  };
};

export default useWeather;
