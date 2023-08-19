import { useNavigate } from "react-router-dom";
import { MdFavorite } from "react-icons/md";

const CurrentWeatherCard = ({
  name,
  temperature,
  handleClick,
  data,
  toggleFavorite,
  favorities,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-sky-300 shadow-lg shadow-[#9cbcdf] flex flex-col gap-4 p-6 text-white transition-all duration-200 ease-in-out transform hover:scale-[.98] hover:shadow-xl  cursor-pointer  md:w-[250px] w-full rounded-lg">
        <p className="font-extrabold text-2xl flex justify-between items-center">
          {name}
          <button
            className="font-bold underline text-sm text-[#1b3474]"
            onClick={() =>
              navigate(`/city-details/${data?.city}`, { state: data })
            }
          >
            view
          </button>
        </p>

        <p className="-mt-3 font-bold">{temperature} &#8451;</p>
        <div className="w-full justify-between flex whitespace-nowrap items-center">
          <button
            onClick={handleClick}
            className="bg-white text-[#1b3474] font-bold rounded-md p-2 text-sm"
          >
            Remove
          </button>
          <div className="text-black">
            <MdFavorite
              className={`${
                favorities && favorities?.includes(data)
                  ? "text-[#FF0000]"
                  : "text-gray-200 shadow-xl"
              }`}
              onClick={toggleFavorite}
              size="20px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentWeatherCard;
