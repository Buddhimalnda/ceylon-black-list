import { TerminalIcon } from "@heroicons/react/solid";
import { serverTimestamp } from "firebase/database";
import { collection, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirebase } from "../../app/config.firebase";
// import { auth, db, rdb } from "../../app/config/firebase";
// import { comands } from "../../app/data/commands";

const BottomBar = () => {
  const { db, auth } = getFirebase();

  const [command, setCommand] = useState("");
  const [lineList, setLineList] = useState([]);
  const onChangeHandler = (e) => {
    if (e.key === "Enter") {
      const words = command.split(" ");
      comands.map((d) => {
        if (words[0].toLowerCase() == d.code) {
          const data = {
            [d.args[1]]: words[1],
            [d.args[2]]: words[2],
            [d.args[3]]: words[3],
            [d.args[4]]: words[4],
            [d.args[5]]: words[5],
            createAT: {
              datetime: serverTimestamp(),
              user: auth?.currentUser.uid,
            },
          };
          d.funtion(data);
        }
      });
    }
  };
  useEffect(() => {
    let unsub;
    const addMaps = async () => {
      unsub = onSnapshot(
        collection(db, "commands"),
        orderBy("timestamp", "asc"),
        (snap) => {
          setLineList(
            snap.docs.map((d) => ({
              key: d.id,
              query: d.data().query,
            }))
          );
        }
      );
    };
    addMaps();
    return unsub;
  }, []);
  // console.log(lineList);
  return (
    <div className="bottom h-10">
      <div className="terminal">
        <label
          onClick={() =>
            document.getElementById("terminal").classList.remove("hidden")
          }
        >
          <TerminalIcon className="h-8 w-8 text-black cursor-pointer " />
        </label>
        <div
          id="terminal"
          className="hidden board fixed right-2  border-2 border-green-900 bg-black text-white bottom-4 w-9/12 h-52"
        >
          <div className="place-content-between   flex h-full flex-col">
            <div className="text overflow-y-scroll ">
              <label
                className="fixed bottom-48 right-12  text-white cursor-pointer hover:text-red-600 "
                onClick={() =>
                  document.getElementById("terminal").classList.add("hidden")
                }
              >
                X
              </label>
              {lineList.map((d, i) => (
                <Line data={d} key={i} />
              ))}
            </div>
            <div className="w-full">
              <input
                type="text"
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => onChangeHandler(e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Line = ({ data }) => (
  <div className="text flex">
    <div className="line-start text-2xl ml-2 ">&#62;</div>
    <div className="query text-xl mt-1 ml-1">{data.query}, </div>
    <div className="line-start text-2xl ml-2 ">{data.key}</div>
  </div>
);

export default BottomBar;
