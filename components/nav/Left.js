import {
  faCar,
  faCarTunnel,
  faGauge,
  faRightFromBracket,
  faTachometer,
  faUser,
  faUserEdit,
  faUserFriends,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserAddIcon, FireIcon, BriefcaseIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFirebase, onAuth, streamUser } from "../../app/config.firebase";
import { useRouter } from "next/router";
function Left() {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [agent, setAgent] = useState(false);
  const router = useRouter();
  // const [userID, setUserID] = useState();
  useEffect(() => {
    if (auth?.currentUser?.uid) router.push("/auth/login");
    let unsub = onAuth((u) => {
      setUser(u);
      const { stream } = streamUser();
      stream((users) => {
        users.map((d) => {
          if (d.id == u?.uid) {
            const role = d.role.split(" ");
            role.map((r, i) => {
              if (r === "admin") {
                setAdmin(true);
                setAgent(true);
              }
              if (r === "agent") setAgent(true);
            });
          }
        });
      });
    });
    return unsub;
  }, []);
  // console.log(admin);
  const { auth } = getFirebase();

  //non-auth
  const listAN = [
    {
      id: 1,
      path: "/default/pointTable",
      text: "point table",
      icon: <FireIcon className="w-f h-full icon" />,
      notfi: false,
    },
    {
      id: 2,
      path: "/challenge",
      text: "Challenge",
      icon: <BriefcaseIcon className="w-f h-full icon" />,
      notfi: false,
    },
  ];
  //auth-admin
  const listA = [
    {
      id: 1,
      path: "/admin/data/addCrew",
      text: "Add Crew",
      // icon: <FontAwesomeIcon icon={faCar} style={{ color: "gray" }} />,
      notfi: false,
    },
    {
      id: 2,
      path: "/admin/data/addMap",
      text: "Add Map",
      // icon: (
      // <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "gray" }} />
      // ),
      notfi: false,
    },
    {
      id: 3,
      path: "/admin/data/addPoints",
      text: "Add Point",
      notfi: false,
    },
    {
      id: 4,
      path: "/admin/data/addUserCrew",
      text: "Manage Crew",
      notfi: false,
    },
  ];
  //auth-user
  const listU = [
    {
      id: 1,
      path: "/crew/",
      text: "Crew",
      icon: (
        <FontAwesomeIcon
          icon={faUserGroup}
          className="w-f h-full icon"
          style={{ color: "gray" }}
        />
      ),
      notfi: false,
    },
    {
      id: 2,
      path: "/auth/logout",
      text: "Logout",
      icon: (
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="w-f h-full icon"
          style={{ color: "gray" }}
        />
      ),
      notfi: false,
    },
    {
      id: 3,
      path: "/user/addCar",
      text: "Add Car",
      icon: (
        <FontAwesomeIcon
          className="w-f h-full icon"
          icon={faCarTunnel}
          style={{ color: "gray" }}
        />
      ),
      notfi: false,
    },
    {
      id: 4,
      path: "/user",
      text: "My Account",
      icon: (
        <FontAwesomeIcon
          className="w-f h-full icon"
          icon={faUser}
          style={{ color: "gray" }}
        />
      ),
      notfi: false,
    },
  ];
  const listAg = [
    {
      id: 1,
      path: "/agent/race",
      text: "Race",
      notfi: false,
    },
  ];
  return (
    <ul className=" fixed left-0 top-1/4 w-36">
      {/* auth default */}
      {listAN.map((d, i) => (
        <li key={i}>
          <LinkTag path={d.path} name={d.text} icon={d.icon} />
        </li>
      ))}

      <li className="mb-2">
        <hr />
      </li>
      {user ? (
        <>
          {listU.map((d, i) => (
            <li key={i}>
              <LinkTag path={d.path} name={d.text} icon={d.icon} />
            </li>
          ))}
          <li>
            <LinkTag
              path="/user/dashboard"
              name="User Dashboard"
              icon={
                <FontAwesomeIcon
                  icon={faUserEdit}
                  className="w-f h-full icon"
                  style={{ color: "gray" }}
                />
              }
            />
          </li>
        </>
      ) : (
        <li>
          {/* auth no */}
          <LinkTag path="/auth/login" name="login" />
        </li>
      )}
      {admin ? (
        <>
          {/* {listA.map((d, i) => ( */}
          <li>
            <LinkTag
              path="/admin/dashboard"
              name="Admin Dashboard"
              icon={
                <FontAwesomeIcon
                  icon={faGauge}
                  className="w-f h-full icon"
                  style={{ color: "gray" }}
                />
              }
            />
          </li>
          {/* ))} */}
        </>
      ) : (
        ""
      )}
      {agent ? (
        <>
          <li>
            <LinkTag
              path="/agent/dashboard"
              name="Agent Dashboard"
              icon={
                <FontAwesomeIcon
                  icon={faTachometer}
                  className="w-f h-full icon"
                  style={{ color: "gray" }}
                />
              }
            />
          </li>
        </>
      ) : (
        ""
      )}
    </ul>
  );
}

const LinkTag = ({ path, icon, name, i }) => {
  return (
    <Link href={path} passHref>
      <div className="in flex items-center mb-2 p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        {/* <UserAddIcon className="w-f h-full icon" /> */}
        {icon}
        <span className="flex-1 ml-3 whitespace-nowrap  hover:inline">
          {name}
        </span>
        {i ? (
          <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
            {i}
          </span>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default Left;
