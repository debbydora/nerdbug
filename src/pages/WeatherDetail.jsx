import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import RightAside from "../components/RightAside/RightAside";
import LeftAside from "../components/LeftAside/LeftAside";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import useWeather from "../hooks/useWeather";
import { useState, useEffect } from "react";

const WeatherDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (state) {
      setData(state);
    } else {
      const storedData = localStorage.getItem("myData");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, [state]);

  const { notes, handleNotesChange, saveNotes, deleteNotes, saving, deleting } =
    useWeather();

  return (
    <Layout>
      <div
        className="bg-gradient-to-r from-sky-400 via-sky-200 to-purple-400 w-full p-10 min-h-screen flex flex-col justify-center"
        data-testid="details"
      >
        <h1 className="text-white font-bold text-4xl cursor-pointer -mt-4 mb-4 flex gap-x-6 items-center">
          <FaArrowAltCircleLeft
            size="30px"
            color="#fff"
            onClick={() => navigate("/")}
          />
          {data?.city ? data.city : data?.state}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-6">
          <aside className=" bg-black bg-opacity-20 col-span-1 lg:col-span-2 md:bg-cloud md:bg-bottom lg:bg-cloud bg-no-repeat bg-bottom bg-contain md:rounded-l-3xl">
            <LeftAside data={data} />
          </aside>
          <aside className="col-span-1 bg-black bg-opacity-30 lg:col-span-4  md:rounded-r-3xl">
            <RightAside
              data={data}
              notes={notes}
              handleNotesChange={handleNotesChange}
              saveNotes={saveNotes}
              deleteNotes={deleteNotes}
              saving={saving}
              deleting={deleting}
            />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default WeatherDetail;
