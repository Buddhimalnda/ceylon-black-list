import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { getFirebase } from "../../../app/config.firebase";

function AddCrew() {
  const { db, auth } = getFirebase();

  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  const onSubmit = async (e) => {
    const data = {
      name: name,
      count: count,
      logo: logo,
      createAT: {
        datetime: new Date(),
        user: auth.currentUser.uid,
      },
    };

    const newRef = doc(collection(db, "crews"));

    // later...
    await setDoc(newRef, data)
      .then(() => alert("Success inserted..!"))
      .catch((error) => console.log(error.message));

    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="flex h-full justify-center place-items-center">
        <div className="w-full max-w-xs shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
          <div className="mb-4 justify-center w-full place-content-center flex font-bold text-2xl">
            <h1>Add New Crew</h1>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Crew name"
              onChange={(e) => setName(e.target.value)}
            />
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
                onChange={(e) => setCount(e.target.value)}
              />
              <div
                className="cursor-pointer numbers ml-4 mt-1 bg-cyan-500 hover:bg-zinc-700 rounded-full text-white px-3 py-1"
                onClick={() => setCount(4)}
              >
                4
              </div>
              <div
                className="cursor-pointer numbers ml-4 mt-1 bg-cyan-500 hover:bg-zinc-700 rounded-full text-white px-3 py-1"
                onClick={() => setCount(3)}
              >
                3
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="logo"
            >
              Logo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="logo"
              onChange={(e) => setLogo(e.target.value)}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </button>
            <input
              type="reset"
              value="reset"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCrew;
