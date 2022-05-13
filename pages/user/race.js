import { data } from "autoprefixer";
import { onValue, ref } from "firebase/database";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirebase } from "../../app/config.firebase";
import CardRace from "../../components/raceList/card";

function Race() {
  const { db } = getFirebase();
  const [list, setList] = useState([]);
  useEffect(() => {
    let unsub;
    const addMaps = async () => {
      unsub = onSnapshot(collection(db, "races"), (snap) => {
        setList(
          snap.docs.map((d) => ({
            id: d.id,
            data: d.data(),
          }))
        );
      });
    };
    addMaps();
    return unsub;
  }, [db]);
  return (
    <div className="race-list mx-40">
      <h1 className="text-center text-3xl font-bold underline mb-4">My Race</h1>
      <div className="list grid grid-cols-3">
        {list?.map((d, i) => (
          <CardRace data={d} key={i} />
        ))}
      </div>
    </div>
  );
}
export default Race;
