import { useEffect, useState } from "react";
import { getFirebase, steamPoints } from "../../app/config.firebase";

function Point() {
  const { db, auth } = getFirebase();

  const [pointList, setPointList] = useState([]);
  useEffect(() => {
    const { stream } = steamPoints();
    stream((data) => {
      setPointList(
        data.map((d) => ({
          name: d.crew,
          members: d.member,
          point: d.value,
        }))
      );
      // console.log(data);
    });
  }, []);
  // console.log(data);

  return (
    <>
      <h1 className="text-center text-3xl font-bold underline -mb-10 ">
        Point Table
      </h1>
      <div className="point-card justify-center place-items-center h-full flex">
        <div className="card-list w-3/4">
          {pointList?.map((data, i) => (
            <Card data={data} i={i} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

const Card = ({ data, i }) => {
  const com =
    "w-full bg-white shadow-lg rounded flex grid grid-cols-4 gap-4 justify-center place-items-center hover:bg-gray-700 hover:text-white";
  return (
    <div
      className={
        i == 0
          ? com +
            " py-7 font-bold border-2 border-cyan-500 hover:bg-gray-700  bg-cyan-900 text-white"
          : com + " py-3 mt-2"
      }
    >
      <div className="number -ml-16 text-left">#0{i + 1}</div>
      <div className="name -ml-20">{data?.name}</div>
      <div className="crew-members flex">
        {data?.members.map((d, y) => (
          <div
            className={i == 0 ? "member-point p-3" : "member-point px-1"}
            key={y}
          >
            {d?.name}
          </div>
        ))}
      </div>
      <div className="points text-right mr-3">{data?.point}</div>
    </div>
  );
};

export default Point;
