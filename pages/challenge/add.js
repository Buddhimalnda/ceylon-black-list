import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  getFirebase,
  streamCrew,
  streamMap,
  streamUser,
} from "../../app/config.firebase";
const challengeTypes = [
  { value: "BL_CHALLENGE", label: "BLACKLIST CHALLENGE" },
  { value: "BL_NOMALE", label: "BLACKLIST NOMALE" },
  { value: "BL_TOP_RACE", label: "BLACKLIST TOP RACE" },
];
const raceTypes = [
  { value: "BL_OPEN", label: "BLACKLIST OPEN" },
  { value: "BL_FRIEND", label: "BLACKLIST FRIEND" },
  { value: "BL_TOP_RACE", label: "BLACKLIST PRIVATE" },
];
const mapTypes = [
  { value: "OFFROAD_L", label: "OFFROAD LAP" },
  { value: "OFFROAD_TC", label: "OFFROAD TIME COUNTER" },
  { value: "NIGHT", label: "NIGHT" },
  { value: "CITY", label: "CITY" },
  { value: "HIGHWAY", label: "HIGHWAY" },
  { value: "SUPPER_L", label: "SUPPER LAP" },
  { value: "SUPPER_TC", label: "SUPPER TIME COUNTER" },
  { value: "ALL", label: "ALL" },
];
function AddChallenge() {
  const [isPrice, setPrice] = useState(false);
  const [PriceType, setPriceType] = useState("");
  const [priceTypeValue, setPriceValue] = useState("");
  const [chllengeType, setChallengeType] = useState("");
  const [raceType, setRaceType] = useState("");
  const [mapType, setMapType] = useState("");
  const [chllengerName, setChllengerName] = useState("");
  const [chllengeCrew, setChllengeCrew] = useState("");
  const [count, setCount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [map, setMap] = useState([]);
  const [userList, setUserList] = useState([]);
  const [crewList, setCrewList] = useState([]);
  const [mentionewList, setMention] = useState([]);
  // const [maps, loading, error] = useCollection(collection(db, "map"));
  // console.log(loading);
  // map

  const { db, auth } = getFirebase();
  const onSubmit = async () => {
    const data = {
      main: {
        priceValue: isPrice == "mission_yes" ? priceTypeValue : "$0",
        chllengeType: chllengeType,
        raceType: raceType,
        mapType: mapType,
        chllengerName: chllengerName,
        chllengeCrew: chllengeCrew,
        map: map,
        count: count,
        date: date.toString(),
        time: time,
        comment: comment,
        mentionewList: mentionewList,
        createAT: {
          auth: auth?.currentUser.uid,
          datetime: new Date().toString(),
        },
      },
    };
    const newRef = doc(collection(db, "challenges"));

    // later...
    await setDoc(newRef, data)
      .then(() => alert("Success inserted..!"))
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    const { stream } = streamUser();
    stream((users) => {
      console.log(users);
      setUserList(
        users.map((d) => ({
          value: d.id,
          label: d.name,
        }))
      );
    });
  }, []);
  useEffect(() => {
    const { stream } = streamCrew();
    stream((crews) => {
      setCrewList(
        crews.map((d) => ({
          value: d.id,
          label: d.name,
        }))
      );
    });
  }, []);
  useEffect(() => {
    const { stream } = streamMap();
    stream((maps) => {
      setMap(
        maps.map((d) => ({
          value: d.id,
          label: d.name,
        }))
      );
    });
  }, []);

  return (
    <div className="add-challenge mx-40">
      <div className="ChallengeReq text-black">
        <form method="post">
          <h1 className="font-bold text-2xl text-center underline mb-4">
            New Challenge
          </h1>
        </form>

        <div className="type grid grid-cols-2 gap-2 w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="count"
            >
              Challenge Type
            </label>
            <Select
              options={challengeTypes}
              onChange={(e) => setChallengeType(e)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="count"
            >
              Race Type
            </label>
            <Select options={raceTypes} onChange={(e) => setRaceType(e)} />
          </div>
        </div>
        <div className="TO  grid grid-cols-2 gap-2 w-full">
          <div className="users mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="count"
            >
              Challenger Name
            </label>
            <Select options={userList} onChange={(e) => setChllengerName(e)} />
          </div>
          <div className="crew mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="count"
            >
              Challenger Crew
            </label>
            <Select options={crewList} onChange={(e) => setChllengeCrew(e)} />
          </div>
          <div className="map mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="count"
            >
              Map
            </label>
            <Select options={map} onChange={(e) => setMap(e)} />
          </div>
          <div className="maptype mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="count"
            >
              Map Type
            </label>
            <Select options={mapTypes} onChange={(e) => setMapType(e)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="count"
              >
                Count
              </label>
              <input
                type="number"
                name="count"
                id="count"
                onChange={(e) => setCount(e.target.value)}
                className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="count"
              >
                Date
              </label>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                name="date"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 ">
            <div className="mx-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="count"
              >
                time
              </label>
              <input
                type="time"
                name="time"
                onChange={(e) => setTime(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mx-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="count"
              >
                Comment
              </label>
              <input
                type="text"
                name="comment"
                onChange={(e) => setComment(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 ">
          <div className="mx-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="count"
            >
              Mention
            </label>
            <Select
              options={userList}
              isMulti
              onChange={(e) => setMention(e)}
            />
          </div>
        </div>
        <div className="mission">
          <div className="type-1 flex">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mr-1"
              htmlFor="count"
            >
              Mission of
            </label>
            <div className="form-check form-check-inline mr-4">
              <input
                className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="mission"
                id="mission_yes"
                value="mission_yes"
                checked={isPrice === "mission_yes"}
                onChange={(e) => setPrice("mission_yes")}
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="mission_yes"
              >
                Price
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="mission"
                id="mission_no"
                checked={isPrice === "mission_no"}
                value="mission_no"
                onChange={(e) => setPrice("mission_no")}
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="mission_no"
              >
                Fun
              </label>
            </div>
          </div>
          <div className="mb-4">
            {isPrice == "mission_yes" ? (
              <>
                <PriceTrue price={(e) => setPriceType(e)} />
                {PriceType == "CAR" ? (
                  <CarType price={(e) => setPriceValue(e)} />
                ) : (
                  <CashType price={(e) => setPriceValue(e)} />
                )}
              </>
            ) : (
              <PriceFalse />
            )}
          </div>
          <div className="grid grid-cols-2">
            <button
              onClick={() => onSubmit()}
              className="bg-blue-500 mr-4 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button className="bg-red-500 ml-4 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CarType = ({ price }) => {
  return (
    <div className="car">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="count"
        >
          Car Name
        </label>
        <input
          onChange={(e) => price(e.target.value)}
          type="text"
          name="comment"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};
const CashType = ({ price }) => {
  return (
    <div className="car">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="count"
        >
          Amount
        </label>
        <input
          onChange={(e) => price(e.target.value)}
          type="text"
          name="comment"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};
const PriceTrue = ({ price }) => {
  return (
    <div className="type-1 flex">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 mr-4"
        htmlFor="count"
      >
        Price is
      </label>
      <div className="form-check form-check-inline mr-4">
        <input
          className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="price"
          id="mission_car"
          value="mission_car"
          onChange={() => price("CAR")}
        />
        <label
          className="form-check-label inline-block text-gray-800"
          htmlFor="mission_car"
        >
          Car
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="price"
          id="mission_cash"
          value="mission_cash"
          onChange={() => price("CASH")}
        />
        <label
          className="form-check-label inline-block text-gray-800"
          htmlFor="mission_cash"
        >
          Cash
        </label>
      </div>
    </div>
  );
};
const PriceFalse = () => {
  return <h3>just For fun</h3>;
};

export default AddChallenge;
