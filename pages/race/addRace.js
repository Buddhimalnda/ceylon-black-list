import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Select from "react-select";
import TextInput from "../../components/input";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getFirebase, streamMap, streamUser } from "../../app/config.firebase";
function AddRace() {
  const { db, auth, rdb } = getFirebase();

  const optionType = [
    { value: "BL_CHALLENGE", label: "BLACKLIST CHALLENGE" },
    { value: "BL_NOMALE", label: "BLACKLIST NOMALE" },
    { value: "BL_TOP_RACE", label: "BLACKLIST TOP RACE" },
  ];
  const options = [
    { value: "OFFROAD_L", label: "OFFROAD LAP" },
    { value: "OFFROAD_TC", label: "OFFROAD TIME COUNTER" },
    { value: "NIGHT", label: "NIGHT" },
    { value: "CITY", label: "CITY" },
    { value: "HIGHWAY", label: "HIGHWAY" },
    { value: "SUPPER_L", label: "SUPPER LAP" },
    { value: "SUPPER_TC", label: "SUPPER TIME COUNTER" },
    { value: "ALL", label: "ALL" },
  ];

  // getting Maps
  const [maps, setMaps] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const { stream } = streamMap();
    stream((maps) => {
      setMaps(
        maps?.docs?.map((d) => ({
          value: d.id,
          label: d.data().name,
        }))
      );
    });
  }, []);
  useEffect(() => {
    const { stream } = streamUser();
    stream((users) => {
      setUserList(
        users?.docs?.map((d) => ({
          value: d.id,
          label: d.data().name,
        }))
      );
    });
  }, []);

  //
  const [r_type, setRType] = useState("");
  const [m_type, setMType] = useState("");
  const [m_name, setMName] = useState("");
  const [racers1, setRacers1] = useState("");
  const [racers2, setRacers2] = useState("");
  const [racers3, setRacers3] = useState("");
  const [racers4, setRacers4] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const onSubmit = async () => {
    const data = {
      raceType: r_type,
      mapType: m_type,
      mapName: m_name,
      racers: [racers1, racers2, racers3, racers4],
      start: {
        date: date,
        time: time,
      },
      createAT: {
        datetime: new Date().toString(),
        user: auth?.currentUser.uid,
      },
    };
    const newRef = doc(collection(db, "races"));

    // later...
    await setDoc(newRef, data)
      .then(() => alert("Success inserted..!"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="flex h-full justify-center place-items-center">
      <div className="w-full max-w-3xl shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
        <div className="mb-4 justify-center w-full place-content-center flex font-bold text-2xl">
          <h1>Add New Race </h1>
        </div>
        <div className=" grid grid-cols-2 gap-2">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mapname"
            >
              Race Type
            </label>
            <Select options={optionType} onChange={(e) => setRType(e)} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Map Type
            </label>
            <Select options={options} onChange={(e) => setMType(e)} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 mb-4">
          <div className="inline-block relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Map Name
            </label>
            {/* add maps from db */}
            <Select options={maps} onChange={(e) => setMName(e)} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 mb-4">
          <div className="grid grid-cols-1 gap-2 mb-4">
            <div className="inline-block relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Racers
              </label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {/* add racers from db */}
                <Select
                  options={userList}
                  onChange={(e) => setRacers1(e.value)}
                />
                <Select
                  options={userList}
                  onChange={(e) => setRacers2(e.value)}
                />
                <Select
                  options={userList}
                  onChange={(e) => setRacers3(e.value)}
                />
                <Select
                  options={userList}
                  onChange={(e) => setRacers4(e.value)}
                />
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-2">
            <div className="mb-4">
              <TextInput
                type="date"
                text="Start Date"
                value={(e) => setDate(e)}
              />
            </div>
            <div className="mb-4">
              <TextInput
                type="time"
                text="Start Time"
                value={(e) => setTime(e)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => onSubmit()}
            className="bg-blue-500 w-1/2 mr-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <input
            type="reset"
            value="reset"
            className="bg-red-500 w-1/2 ml-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </div>
  );
}

export default AddRace;

/*


<select name="map">
          <option value="select">select </option>
          {/* search users here 
          <option value="MAP">MAP Name </option>
        </select>
        <select name="type">
          <option value="select">select </option>
          <option value="BL_CHALLENGE">BLACKLIST CHALLENGE</option>
          <option value="BL_NOMALE">BLACKLIST NOMALE</option>
          <option value="BL_TOP_RACE">BLACKLIST TOP RACE</option>
        </select>
        <input type="date" name="date" />
        <input type="time" name="time" />
        {/* players 
        <select name="player">
          <option value="select">select </option>
          {/* search users here *
          <option value="USER">USER Name </option>
        </select>
        <button>+</button>
        <button>-</button>
        {/* players *
        <select name="type">
          <option value="select">select</option>
          <option value="OFFROAD_L">OFFROAD LAP</option>
          <option value="OFFROAD_TC">OFFROAD TIME COUNTER</option>
          <option value="NIGHT">NIGHT</option>
          <option value="CITY">CITY</option>
          <option value="HIGHWAY">HIGHWAY</option>
          <option value="SUPPER_L">SUPPER LAP</option>
          <option value="SUPPER_TC">SUPPER TIME COUNTER</option>
          <option value="ALL">ALL</option>
        </select>  */
