import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  getFirebase,
  streamCrew,
  streamUser,
} from "../../../app/config.firebase";

function AddPoint() {
  const { db, auth } = getFirebase();

  const [player, setPlayer] = useState("");
  const [type, setType] = useState("");

  const optionType = [
    { value: "ADD", label: "ADD POINTS" },
    { value: "REMOVE", label: "REMOVE POINTS" },
  ];
  const optionTypes = [
    { value: "PLAYER", label: "PLAYER" },
    { value: "CREW", label: "CREW" },
  ];
  const [count, setCount] = useState(0);
  const [crewList, setCrewList] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [types, setTypes] = useState("PLAYER");

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
    const { stream } = streamUser();
    stream((users) => {
      setPlayList(
        users.map((d) => ({
          value: d.id,
          label: d.name,
        }))
      );
    });
  }, []);

  const onSubmit = async (e) => {
    const data = {
      player: player,
      count: count,
      type: crew,
      createAT: {
        datetime: serverTimestamp(),
        user: auth.currentUser.uid,
      },
    };
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="flex h-full justify-center place-items-center">
        <div className="w-full max-w-2xl shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
          <div className="mb-4 justify-center w-full place-content-center flex font-bold text-2xl">
            <h1>Add Points</h1>
          </div>
          <div className=" grid grid-cols-2 gap-2 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Who win?
              </label>
              <Select
                options={optionTypes}
                onChange={(e) => setTypes(e.value)}
              />
            </div>
            {types == "CREW" ? (
              <Crew op={crewList} out={(e) => setPlayer(e)} />
            ) : (
              <Player op={playList} out={(e) => setPlayer(e)} />
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Add / Remove
              </label>
              <Select options={optionType} onChange={(e) => setType(e.value)} />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="count"
            >
              Count
            </label>
            <div className="set flex">
              <input
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="count"
                type="number"
                placeholder="count"
                value={count}
              />
              <div
                className="cursor-pointer numbers ml-4 mt-1 bg-cyan-500 hover:bg-zinc-700 rounded-full text-white px-3 py-1"
                onClick={() => setCount(100)}
              >
                100
              </div>
              <div
                className="cursor-pointer numbers ml-4 mt-1 bg-cyan-500 hover:bg-zinc-700 rounded-full text-white px-3 py-1"
                onClick={() => setCount(75)}
              >
                75
              </div>
              <div
                className="cursor-pointer numbers ml-4 mt-1 bg-cyan-500 hover:bg-zinc-700 rounded-full text-white px-3 py-1"
                onClick={() => setCount(50)}
              >
                50
              </div>
              <div
                className="cursor-pointer numbers ml-4 mt-1 bg-cyan-500 hover:bg-zinc-700 rounded-full text-white px-3 py-1"
                onClick={() => setCount(20)}
              >
                20
              </div>
              <div
                className="cursor-pointer numbers ml-4 mt-1 bg-cyan-500 hover:bg-zinc-700 rounded-full text-white px-3 py-1"
                onClick={() => setCount(10)}
              >
                10
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <input
              value="Submit"
              className="bg-blue-500 mx-1 w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => onSubmit()}
            />
            <input
              type="reset"
              value="reset"
              className="bg-red-500 mx-1 w-1/2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Crew = ({ out, op }) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="username"
    >
      Crew Name
    </label>
    <Select options={op} onChange={(e) => out(e.value)} />
  </div>
);

const Player = ({ out, op }) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="username"
    >
      Player Name
    </label>
    <Select options={op} onChange={(e) => out(e.value)} />
  </div>
);

export default AddPoint;
