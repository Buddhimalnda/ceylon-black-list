import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  streamChallengeOnce,
  streamChallengeOnceList,
} from "../../app/config.firebase";

export default function Card_temp_1({ toggle, settoggle, data }) {
  const router = useRouter();
  const [list, setList] = useState([]);
  console.log(data);
  const challengeID = data.id;
  useEffect(() => {
    const { stream } = streamChallengeOnceList({ challengeID });
    stream((data) => {
      setList(data);
    });
  }, [challengeID]);
  console.log(list);
  return (
    <div className="card">
      <div className="content">
        <div className="front ">
          <div className="top slide slide1">
            <div className="">
              {data.main.chllengeCrew.label}, {data.main.chllengerName.label}{" "}
              challege you to {data.main.priceValue}
            </div>
          </div>
          <div className="bottom slide slide2 ">
            <p>
              Race is start at {data.main.date} , {data.main.time} in{" "}
              {data.main.map.label} map
            </p>
            <p>Race Type is {data.main.raceType.label}</p>
            <div
              className="btn mt-3 bg-amber-600 text-white rounded-xl hover:bg-amber-800"
              onClick={() => router.push(`challenge/${data.id}`)}
            >
              Accept
            </div>
          </div>
        </div>
        <div className="back">
          <h3>
            acceptCount : <span>{list.length}</span>
          </h3>
          <div className="list">
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
        </div>
      </div>
    </div>
  );
}

/*
style={{
          backgroundImage: `url('${
            !data?.priceValue == "$0"
              ? "https://cdn.discordapp.com/attachments/956724850079195196/957094182726553600/download.jpg"
              : data?.priceValue > 65
              ? data?.url
              : "https://cdn.discordapp.com/attachments/956724850079195196/957093685043003392/istockphoto-172267398-612x612.jpg"
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}*/
