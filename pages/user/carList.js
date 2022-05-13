import { query } from "firebase/database";
import { collection, onSnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getFirebase } from "../../app/config.firebase";

function CarList() {
  const { db, auth } = getFirebase();
  const [carList, setCarList] = useState([]);
  const carCol = collection(db, "cars");

  const carsQuery = query(
    carCol,
    where("owner.value", "==", auth?.currentUser?.uid)
  );
  useEffect(() => {
    onSnapshot(carsQuery, (snap) => {
      const cars = snap.docs.map((doc) => {
        const isDelivered = !doc.metadata.hasPendingWrites;
        return {
          isDelivered,
          id: doc.id,
          ...doc.data(),
        };
      });
      setCarList(cars);
    });
  }, [carsQuery]);
  return (
    <div className="list flex">
      {carList.map((d, i) => (
        <div
          className="card flex max-w-lg bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-2"
          key={i}
        >
          <div className="img  p-1 m-3">
            <Image
              src={d?.img}
              width={90}
              height={90}
              className="rounded-full"
              alt={d.name}
            />
          </div>
          <div className="details mx-2">
            <div className="name  p-1">{d.name}</div>
            <div className="description p-1">{d.description}</div>
            <div className="r-type flex my-2">
              {d.raceType.map((y, x) => (
                <div
                  className="tag ml-3 border-2 rounded-xl p-1 hover:bg-cyan-600 hover:text-white"
                  key={x}
                >
                  #<span>{y.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarList;
