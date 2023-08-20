import CurrentWeatherCard from "../components/CityWeatherItem";
import Search from "../components/Search";
import useWeather from "../hooks/useWeather";
import { MdMyLocation } from "react-icons/md";

const Home = () => {
  const {
    sortedWeatherData,
    removeCity,
    toggleFavorite,
    sortedFavorites,
    favorities,
    searchTerm,
    handleSearchChange,
    fetchCity,
    handleLocationClick,
    searchedCity,
    locate,
  } = useWeather();

  return (
    <>
      <div
        className="home w-full min-h-screen p-8 flex flex-col gap-10"
        data-testid="home"
      >
        <h1 className="text-sky-300 font-extrabold text-4xl logoT">
          Weatherio
        </h1>
        <div className="flex md:flex-row gap-x-20 flex-col gap-y-2 justify-between items-center">
          <Search
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            fetchData={fetchCity}
          />
          <div className="flex flex-col items-center">
            <button
              className="p-4 bg-sky-300 text-black rounded-[50%] flex"
              onClick={handleLocationClick}
            >
              <MdMyLocation />
            </button>
            <p className="whitespace-nowrap text-sm font-extrabold">
              {locate ? "Locating..." : "Current Location"}
            </p>
          </div>
        </div>

        {sortedFavorites.length !== 0 && (
          <>
            <p className="text-2xl text-[#282727] font-extrabold -mb-6">
              Favourite cities
            </p>
            <div className="flex justify-between flex-wrap gap-8 ">
              {sortedFavorites.map((cityWeather, index) => (
                <CurrentWeatherCard
                  key={index}
                  name={cityWeather.city}
                  temperature={cityWeather.temperature}
                  data={cityWeather}
                  handleClick={() => removeCity(cityWeather.city)}
                  toggleFavorite={() => toggleFavorite(cityWeather)}
                  favorities={favorities}
                />
              ))}
            </div>
          </>
        )}

        <p className="text-2xl text-[#282727] font-extrabold -mb-6 mt-8">
          Cities
        </p>
        <div className="flex justify-between flex-wrap gap-8">
          {(searchTerm !== null && searchedCity.length > 0
            ? searchedCity
            : sortedWeatherData
          ).map((cityWeather, index) => (
            <CurrentWeatherCard
              key={index}
              name={cityWeather.city}
              temperature={cityWeather.temperature}
              data={cityWeather}
              handleClick={() => removeCity(cityWeather.city)}
              toggleFavorite={() => toggleFavorite(cityWeather)}
              favorities={favorities}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
