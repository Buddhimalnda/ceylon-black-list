import { collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Select from "react-select";
import { getFirebase, streamUser } from "../../app/config.firebase";
import TextInput from "../../components/input";

const RaceTypes = [
  { value: "OFFROAD_L", label: "OFFROAD LAP" },
  { value: "OFFROAD_TC", label: "OFFROAD TIME COUNTER" },
  { value: "NIGHT", label: "NIGHT" },
  { value: "CITY", label: "CITY" },
  { value: "HIGHWAY", label: "HIGHWAY" },
  { value: "SUPPER_L", label: "SUPPER LAP" },
  { value: "SUPPER_TC", label: "SUPPER TIME COUNTER" },
  { value: "ALL", label: "ALL" },
];
function AddCar() {
  const { db, auth } = getFirebase();
  const [userList, setUserList] = useState([]);

  const [price, setPrice] = useState(false);
  const [raceType, setRaceType] = useState("");
  const [count, setCount] = useState("");
  const [owner, setOwner] = useState("");
  const [comment, setComment] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
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
  const onSubmit = async () => {
    const data = {
      raceType: raceType,
      description: comment,
      img: url,
      name: name,
      owner: owner,
      price: price,
      createAT: {
        auth: auth?.currentUser.uid,
        datetime: new Date().toString(),
      },
    };
    const newRef = doc(collection(db, "cars"));

    // later...
    await setDoc(newRef, data)
      .then(() => alert("Success inserted..!"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="add-challenge mx-32">
      <div className="ChallengeReq text-black">
        <form method="post">
          <h1 className="font-bold text-2xl text-center underline mb-4">
            New Car
          </h1>
        </form>

        <div className="type grid grid-cols-2 gap-2 w-full">
          <div className="mb-4">
            <TextInput type="text" value={(e) => setName(e)} text="Car Name" />
          </div>
          <div className="mb-4">
            <TextInput
              type="text"
              value={(e) => setUrl(e)}
              text="Car Image Url"
            />
          </div>
          <div className="mb-4">
            <TextInput
              type="text"
              value={(e) => setPrice(e)}
              text="Car Value"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="count"
            >
              Car Owner
            </label>
            <Select options={userList} onChange={(e) => setOwner(e)} />
          </div>
          <div className="mb-4 mx-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="count"
            >
              Map types
            </label>
            <Select
              options={RaceTypes}
              isMulti
              onChange={(e) => setRaceType(e)}
            />
          </div>
        </div>

        <div className="mission">
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

export default AddCar;
