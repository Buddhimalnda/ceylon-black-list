import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { getFirebase } from "../../app/config.firebase";
function CardRace({ data }) {
  const { db, auth } = getFirebase();

  // console.log(data);
  const FindName = ({ did }) => {
    const [name, setName] = useState();
    if (did) {
      const col = doc(db, "users", did);
      onSnapshot(col, (snap) => {
        setName(snap.data().icname);
      });
    }
    return <span>{name}</span>;
  };
  const GetResult = () => {
    const [result, setResult] = useState();

    const col = collection(db, "races", data?.id, "result");
    onSnapshot(col, (snap) => {
      setResult(snap.docs.map((d) => ({ id: d.id, d: d.data() })));
      // console.log(result);
    });
    return (
      <div>
        {result?.map((doc, i) => (
          <div className="result-0" key={i}>
            <p>
              1st place - <FindName did={doc.d.p_1} />
            </p>
            <p>
              2nd place - <FindName did={doc.d.p_2} />
            </p>
            {result.length > 2 ? (
              <p>
                3rd place - <FindName did={doc.d?.p_3} />
              </p>
            ) : (
              " "
            )}
            {result.length > 3 ? (
              <p>
                4th place - <FindName did={doc.d?.p_4} />
              </p>
            ) : (
              " "
            )}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="race-card max-w-xs shadow-lg ">
      <div className="flex p-5 ">
        <div className="title">
          {data?.data.mapType.label + " " + data?.data.raceType.label}
        </div>
        <div className="info border-l-2 mx-4">
          <div className="racers ml-3">
            <div className="member">
              <FindName did={data.data.racers[0]} />
            </div>
            <div className="member">
              <FindName did={data.data.racers[1]} />
            </div>
            <div className="member">
              <FindName
                did={data.data.racers[2] === "" ? false : data.data.racers[2]}
              />
            </div>
            <div className="member">
              <FindName
                did={data.data.racers[3] === "" ? false : data.data.racers[2]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="date flex mx-4">
          <div className="status text-center">
            {data.data.start.date} at {data.data.start.time}
          </div>
        </div>
        <div className="flex justify-between mx-4 mb-4">
          <div className="status">{data.data.mapType.label}</div>
          <div className="status  hover:bg-cyan-800 bg-cyan-400 px-2">
            <FontAwesomeIcon
              className="w-f h-full icon"
              icon={faArrowRight}
              style={{ color: "white" }}
            />
          </div>
        </div>
        <GetResult />
      </div>
    </div>
  );
}
export default CardRace;
