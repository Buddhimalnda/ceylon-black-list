import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  getFirebase,
  streamCrew,
  streamUser,
} from "../../../app/config.firebase";

function AddUserCrew() {
  const { db, auth } = getFirebase();

  const options = [
    { value: "LEADER", label: "LEADER" },
    { value: "MEMBER", label: "MEMBER" },
    { value: "TEMP", label: "TEMP MEMBER" },
  ];
  const optionsYN = [
    { value: "YES", label: "YES" },
    { value: "NO", label: "NO" },
  ];
  const [user, setUser] = useState("");
  const [crew, setCrew] = useState("");
  const [memberType, setMemberType] = useState("");
  const [isVerify, setIsVerify] = useState(false);

  const [userList, setUserList] = useState([]);
  const [crewList, setCrewList] = useState([]);
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
      setUserList(
        users.map((d) => ({
          value: d.id,
          label: d.name,
        }))
      );
    });
  }, []);

  const onSubmit = async (e) => {
    const data = {
      user: user,
      memberType: memberType,
      isVerify: isVerify,
      createAT: {
        datetime: serverTimestamp(),
        user: auth.currentUser.uid,
      },
    };
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="justify-center place-items-center flex h-full">
        <div className="w-full max-w-3xl shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
          <div className="mb-4 justify-center w-full place-content-center flex font-bold text-2xl">
            <h1>Add User to Crew </h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="mb-4 mr-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <Select options={userList} onChange={(e) => setUser(e)} />
            </div>
            <div className="mb-4 ml-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Crew name
              </label>
              <Select options={crewList} onChange={(e) => setCrew(e)} />
            </div>
            <div className="mb-4 mr-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Member
              </label>
              <Select options={options} onChange={(e) => setMemberType(e)} />
            </div>
            <div className="mb-4 ml-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Verified?
              </label>
              <Select options={optionsYN} onChange={(e) => setIsVerify(e)} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              value="Submit"
              onClick={(e) => onSubmit(e)}
              className="bg-blue-500 w-full mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <input
              type="reset"
              value="reset"
              className="bg-red-500 w-full ml-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserCrew;
