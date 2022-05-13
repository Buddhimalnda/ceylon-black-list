import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Select from "react-select";
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
  const [maps, setMaps] = useState([]);
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [r_type, setRType] = useState("");
  const [m_type, setMType] = useState("");

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
  return (
    <div className="race-add flex h-full justify-center place-items-center">
      <div className="panel ">
        <h1 className="text-center text-2xl font-bold">Add Race</h1>
        <div className="panel-1">
          <div className="body">
            <h3 className="text-center">Create Race</h3>
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mapname"
                >
                  Race Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="raceName"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Race Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Map
                </label>
                <Select options={maps} onChange={(e) => setMType(e)} />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Count
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="count"
                  type="number"
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="count"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Price
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="count"
                  type="text"
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="Price"
                />
              </div>
            </div>
          </div>
          <div className="btn-list">
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 w-1/2 mr-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Next
              </button>
              <input
                type="reset"
                value="reset"
                className="bg-red-500 w-1/2 ml-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
        <div className="panel-2 hidden">
          <div className="body">
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
                </div>
              </div>
            </div>
          </div>
          <div className="btn-list">
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 w-1/2 mr-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Next
              </button>
              <input
                type="reset"
                value="reset"
                className="bg-red-500 w-1/2 ml-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRace;
