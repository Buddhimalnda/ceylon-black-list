import { useEffect, useState } from "react";
import {
  streamChallenge,
  streamChallengeOnceList,
} from "../../app/config.firebase";
import { useRouter } from "next/router";
import { ArrowRightIcon, XIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarBurst, faInfo } from "@fortawesome/free-solid-svg-icons";
import { serverTimestamp } from "firebase/database";
import Loading from "../loading";
function Table() {
  const router = useRouter();

  const [list, setList] = useState([]);
  useEffect(() => {
    const { stream } = streamChallenge();
    stream((datas) => {
      setList(datas);
    });
  }, []);
  if (list.length > 0)
    return (
      <div className="table">
        <table className="table-auto table w-full " cellPadding={10}>
          <thead>
            <tr>
              <th>Chllenge Type</th>
              <th>Map</th>
              <th>Race Type</th>
              <th>Count</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {list.map((d, i) => (
              <Tr d={d} router={router} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  else
    return (
      <div className="lo text-center">
        <p>there is no any challenge for you... </p>
        <p>IF you like create challenge, click the plus </p>
      </div>
    );
}
const Tr = ({ d, router }) => {
  const [toggle, setToggle] = useState(false);
  console.log(toggle);
  const [list, setList] = useState([]);
  const challengeID = d.id;
  useEffect(() => {
    const { stream } = streamChallengeOnceList({ challengeID });
    stream((data) => {
      setList(data);
    });
  }, [challengeID]);
  return (
    <tr className="hover:bg-slate-700 hover:text-white bg-slate-400  text-center">
      <td>{d.chllengeType.label}</td>
      <td>{d.map.label}</td>
      <td>{d.raceType.label}</td>
      <td>{d.count}</td>
      <td>{d.date}</td>
      <td>{d.time}</td>
      <td>{d.priceValue}</td>
      <td>
        <button onClick={(e) => router.push(`challenge/${d.id}`)}>
          <ArrowRightIcon className="text-white w-5" />
        </button>
      </td>
      <td>
        <button
          onClick={(e) =>
            alert(
              `crew is ${d.chllengeCrew.label} and player was ${d.chllengerName.label} challenge you.At the End he/she said ${d.comment} `
            )
          }
        >
          <FontAwesomeIcon icon={faInfo} className="w-f h-full  text-white" />
        </button>
      </td>
    </tr>
  );
};

const Model = ({ challengeID }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const { stream } = streamChallengeOnceList({ challengeID });
    stream((data) => {
      setList(data);
    });
  }, [challengeID]);
  return (
    <div className="model fixed justify-center place-content-center bg-black ">
      {list.length > 0 &&
        list?.map((d, i) => (
          <div
            className={`list-${i} border-b border-gray-500 flex mx-3`}
            key={i}
          >
            <div className="mx-1"> #0{i + 1} </div>
            <div className="name mx-1">
              {d.acceptUser.label}, {d.acceptCrew.label}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Table;
// datas.map((d) => {
//     //   if (d.main.date.split("-")[2] >= new Date().getDate()) return d;
//     console.log(d);
//   })
