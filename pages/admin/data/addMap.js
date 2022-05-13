import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import Select from "react-select";
import { getFirebase } from "../../../app/config.firebase";

function AddMap() {
  const { db, auth } = getFirebase();

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
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [tag, setTag] = useState("");

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
    console.log(data);
    // Add a new document with a generated id
    const newRef = doc(collection(db, "maps"));

    // later...
    await setDoc(newRef, data)
      .then(() => alert("Success inserted..!"))
      .catch((error) => console.log(error.message));
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="flex h-full justify-center place-items-center">
        <div className="w-full max-w-3xl shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
          <div className="mb-4 justify-center w-full place-content-center flex font-bold text-2xl">
            <h1>Add New Map </h1>
          </div>
          <div className=" grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mapname"
              >
                Map Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mapname"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="map name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mapfile"
              >
                Map image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mapfile"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="map file"
              />
            </div>
          </div>
          <div className=" grid grid-cols-1 gap-2 mb-4">
            <div className="inline-block relative w-2/3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tag"
              >
                Tags
              </label>
              <Select
                options={options}
                id="tag"
                isMulti
                onChange={(e) => setTag(e)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </button>
            <input
              type="reset"
              value="reset"
              className="bg-red-500 w-1/2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMap;
