/* eslint-disable react/prop-types */
import { MdOutlineLocationOn } from "react-icons/md";
import { makeIconURL } from "../../Constant";

const LeftAside = ({ data }) => {
  const iconId = data?.icon && data?.icon;
  const icon = makeIconURL(iconId);
  return (
    <>
      <div className="flex-col h-full p-8">
        {/* image */}
        <div className="flex flex-col justify-start items-center ">
          {data?.icon ? (
            <img src={icon} alt="detail" className="w-[150px] h-[150px]" />
          ) : (
            ""
          )}

          <p className="">
            <span className="font-extrabold text-white text-4xl">
              {data?.temperature
                ? `${data.temperature}°C`
                : `Latitude: ${Math.round(data?.lat * 100) / 100}`}
            </span>
          </p>
          <p className="text-gray-50 font-bold mt-10 text-3xl">
            {data?.description
              ? data?.description
              : `Longitude: ${Math.round(data?.lon * 100) / 100}`}
          </p>
          <div className="flex justify-center items-center">
            <p className="text-gray-400 font-bold text-2xl mt-12">
              <MdOutlineLocationOn />
            </p>
            <p className="text-gray-400 font-bold text-2xl mt-12">
              {data?.city ? data?.city : data?.name}
            </p>
          </div>
        </div>

        {data?.feelsLike && (
          <div className="bg-white bg-opacity-25 p-4 flex md:flex-row flex-col gap-y-4 gap-x-4 justify-between rounded-lg mt-10">
            <div className="text-white font-bold text-center">
              <p>{data?.feelsLike} &#8451;</p>
              <p className="font-normal text-lg ">Feels Like</p>
            </div>
            <div className="text-white  font-bold text-center">
              <p>{data?.humidity}%</p>
              <p className=" font-normal text-lg">Humidity</p>
            </div>
            <div className="text-white font-bold text-center">
              <p>{data?.windSpeed} MPH</p>
              <p className="font-normal text-lg">Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LeftAside;
