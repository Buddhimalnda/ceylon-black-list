import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFirebase, streamUser } from "../../app/config.firebase";
import CarList from "./carList";
function UserProfile() {
  const { auth } = getFirebase();
  const [user, setUser] = useState(false);
  const userID = auth?.currentUser?.uid;
  useEffect(() => {
    const { stream } = streamUser();
    let unsub = stream((users) => {
      users.map((d) => {
        if (d.id == userID) {
          setUser(d);
        }
      });
    });
    return unsub;
  }, [userID]);
  // console.log(user);
  const router = useRouter();
  if (user)
    return (
      <div className="user-card flex flex-col justify-between place-items-center  h-full">
        <div className="max-w-lg bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full">
          <div className="flex justify-end px-4 pt-4">
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
            </button>
            <div
              id="dropdown"
              className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            >
              <ul className="py-1" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Export Data
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <Image
              className="mb-3 w-24 h-24 rounded-full shadow-lg"
              src={user?.logo}
              alt={user?.username}
              height={100}
              width={100}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user?.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user?.icname}
            </span>
            <div className="flex mt-4 space-x-3 lg:mt-6">
              <button
                onClick={(e) => router.push("/crew")}
                className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Crew
              </button>
              <button
                onClick={(e) => alert("comming soon")}
                className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Message
              </button>
            </div>
          </div>
        </div>
        <div className="car-list">
          <h1 className="text-center font-bold text-3xl mb-3">Car List</h1>
          <CarList />
        </div>
      </div>
    );
}

export default UserProfile;
