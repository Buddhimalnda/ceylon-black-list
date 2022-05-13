import { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import { ArrowLeftIcon, BackspaceIcon } from "@heroicons/react/solid";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  getFirebase,
  streamChallenge,
  streamChallengeOnce,
  streamCrew,
  streamUser,
} from "../../app/config.firebase";

function ChallengeAccept() {
  const { db, auth } = getFirebase();

  const router = useRouter();
  const { challengeId } = router.query;
  const [challenge, setChallenge] = useState({});
  const [userList, setUserList] = useState([]);
  const [crewList, setCrewList] = useState([]);
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
  const challengeID = challengeId;
  useEffect(() => {
    const { stream } = streamChallenge();
    stream((data) => {
      data.map((d) => {
        if (d.id === challengeID) setChallenge(d);
      });
    });
  }, [challengeID]);
  const [price, setPrice] = useState(challenge?.main?.priceValue);
  const [user, setUser] = useState("");
  const [crew, setCrew] = useState("");
  const [comment, setComment] = useState("");

  const onSubmit = async (e) => {
    const data = {
      acceptUser: user,
      acceptCrew: crew,
      acceptComment: comment,
      updateAT: {
        auth: auth?.currentUser.uid,
        datetime: new Date().toString(),
      },
    };
    const newRef = collection(db, "challenges", challengeId, "acceptlist");

    // later...
    await addDoc(newRef, data)
      .then(() => alert("Success inserted..!"))
      .catch((error) => console.log(error.message));
    e.preventDefault();
  };

  return (
    <div className="justify-center place-items-center flex h-full">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Challenge
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="users mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="count"
              >
                Challenger Name
              </label>
              <Select options={userList} onChange={(e) => setUser(e)} />
            </div>
            <div className="crew mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="count"
              >
                Challenger Crew
              </label>
              <Select options={crewList} onChange={(e) => setCrew(e)} />
            </div>
            <div className="grid grid-cols-2">
              <div className="mb-4 mr-2">
                <label
                  className="block w-full  text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={challenge?.priceValue == "$0"}
                  value={price || "" + challenge?.priceValue}
                  className="shadow  w-full appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 ml-2">
                <label
                  className="block w-full text-gray-700 text-sm font-bold mb-2"
                  htmlFor="count"
                >
                  Comment
                </label>
                <input
                  type="text"
                  name="count"
                  onChange={(e) => setComment(e.target.value)}
                  className="shadow  w-full appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              onClick={(e) => onSubmit(e)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeAccept;
