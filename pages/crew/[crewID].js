import {
  faArrowPointer,
  faDeleteLeft,
  faEdit,
  faRecycle,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  getFirebase,
  streamCrewMember,
  streamUser,
} from "../../app/config.firebase";
import { useRouter } from "next/router";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
function Crew() {
  const { db, auth } = getFirebase();
  const [crewData, setCrew] = useState({});
  const [memberList, setMemberList] = useState([]);
  const router = useRouter();
  const { crewID } = router.query;
  useEffect(() => {
    const { stream } = streamCrewMember({ crewID });
    stream((crew) => {
      console.log(crew);
      setMemberList(
        crew.map((d) => ({
          name: d.user.label,
          memberType: d.memberType.label,
        }))
      );
    });
  }, [crewID]);

  useEffect(() => {
    const col = doc(db, "crews", crewID);
    onSnapshot(col, (snap) => {
      setCrew({
        logo: snap.data()?.logo,
        name: snap.data().name,
        about: snap.data().about,
      });
    });
  }, [crewID, db]);

  console.log(crewData.logo);
  return (
    <div className="crew">
      <div className="race flex h-full justify-center place-items-center">
        <div className="w-full h-full-- max-w-2xl shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
          <h1 className="text-center font-bold text-2xl">
            {crewData.name} | <span>{}</span>
          </h1>
          <div className="body">
            <div className="uper flex">
              {crewData.logo && (
                <Image
                  src={crewData.logo}
                  width={450}
                  height={200}
                  alt="logo"
                />
              )}
              <p className="ml-4">{crewData.about}</p>
            </div>
            <table className="table-auto table w-full text-center">
              <caption>Crew Member</caption>
              <thead>
                <tr>
                  <th>#0</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th colSpan={3}>Action</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((d, i) => (
                  <tr key={i}>
                    <td>#0{i + 1}</td>
                    <td>{d.name}</td>
                    <td>{d.memberType}</td>
                    <td>
                      <FontAwesomeIcon icon={faEdit} />
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faRemove} />
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faArrowPointer} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Crew;
