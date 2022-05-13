import {
  faArrowPointer,
  faEdit,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { streamCrew } from "../../app/config.firebase";

function CrewList() {
  const [crewList, setCrewList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const { stream } = streamCrew();
    stream((data) => {
      console.log(data);
      setCrewList(
        data.map((d) => ({
          id: d.id,
          name: d.name,
          count: d.count,
          // color: d.color.code,
        }))
      );
    });
  }, []);
  return (
    <div className="list">
      <div className="flex h-full justify-center place-items-center">
        <div className="w-full max-w-2xl shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
          <div className="mb-4 justify-center w-full place-content-center flex font-bold text-2xl">
            <h1>Crew List</h1>
          </div>
          <table className="table-auto table w-full text-center">
            <thead>
              <tr>
                <th>#00</th>
                <th>name</th>
                <th>count</th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              {crewList.map((d, i) => (
                <tr
                  key={i}
                  // style={{ backgroundColor: d.color }}
                  className="hover:bg-zinc-600 hover:text-white"
                >
                  <td>#0{i + 1}</td>
                  <td>{d.name}</td>
                  <td>{d.count}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faRemove} />
                  </td>
                  <td onClick={() => router.push(`/crew/${d.id}`)}>
                    <FontAwesomeIcon icon={faArrowPointer} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default CrewList;
