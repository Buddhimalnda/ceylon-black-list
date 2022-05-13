import { PlusIcon } from "@heroicons/react/solid";
import Card_temp_2 from "../../components/challenge/card2";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { streamChallenge } from "../../app/config.firebase";
import Table from "../../components/challenge/table";

function Challenge() {
  const router = useRouter();

  return (
    <div className="challenge">
      <div className="row place-content-between flex m-10">
        <span onClick={() => router.push("/challenge/add")}>
          <PlusIcon className="h-10 w-10 hover:text-red-900" />
        </span>
        <h1 className=" text-3xl font-semibold underline mb-2">Challenge</h1>
        <span></span>
      </div>
      <div className=" challenge-list mx-32 overflow-auto h-96 flex justify-center">
        <Table />
      </div>
    </div>
  );
}

// const list = [
//   {
//     challengeId: "CH001",
//     chType: "BL_CHALLENGE",
//     raceType: "BL_OPEN",
//     challenger: "buddhi",
//     map: "LAP",
//     date: "2022/03/30",
//     time: "12:00PM",
//     maptype: "OFFROAD_L",
//     url: "https://cdn.discordapp.com/attachments/956724850079195196/956724973685321818/car-g8e430ecb9_1920.jpg",
//     mission: { type: true, car: true, price: "BMW M3" },
//   },
//   {
//     challengeId: "CH002",
//     chType: "BL_CHALLENGE",
//     raceType: "BL_OPEN",
//     challenger: "buddhi",
//     map: "LAP",
//     date: "2022/03/30",
//     time: "12:00PM",
//     maptype: "OFFROAD_L",
//     mission: { type: false, car: true, price: "$0" },
//     // url: "https://cdn.discordapp.com/attachments/956724850079195196/956724973685321818/car-g8e430ecb9_1920.jpg",
//   },
//   {
//     challengeId: "CH003",
//     chType: "BL_CHALLENGE",
//     raceType: "BL_OPEN",
//     challenger: "buddhi",
//     map: "LAP",
//     date: "2022/03/30",
//     time: "12:00PM",
//     maptype: "OFFROAD_L",
//     mission: { type: true, car: false, price: "$100,000" },
//     // url: "https://cdn.discordapp.com/attachments/956724850079195196/956724973685321818/car-g8e430ecb9_1920.jpg",
//   },
//   {
//     challengeId: "CH003",
//     chType: "BL_CHALLENGE",
//     raceType: "BL_OPEN",
//     challenger: "buddhi",
//     map: "LAP",
//     date: "2022/03/30",
//     time: "12:00PM",
//     maptype: "OFFROAD_L",
//     mission: { type: true, car: false, price: "$100,000" },
//     // url: "https://cdn.discordapp.com/attachments/956724850079195196/956724973685321818/car-g8e430ecb9_1920.jpg",
//   },
//   {
//     challengeId: "CH003",
//     chType: "BL_CHALLENGE",
//     raceType: "BL_OPEN",
//     challenger: "buddhi",
//     map: "LAP",
//     date: "2022/03/30",
//     time: "12:00PM",
//     maptype: "OFFROAD_L",
//     mission: { type: true, car: false, price: "$100,000" },
//     // url: "https://cdn.discordapp.com/attachments/956724850079195196/956724973685321818/car-g8e430ecb9_1920.jpg",
//   },
//   {
//     challengeId: "CH003",
//     chType: "BL_CHALLENGE",
//     raceType: "BL_OPEN",
//     challenger: "buddhi",
//     map: "LAP",
//     date: "2022/03/30",
//     time: "12:00PM",
//     maptype: "OFFROAD_L",
//     mission: { type: true, car: false, price: "$100,000" },
//     // url: "https://cdn.discordapp.com/attachments/956724850079195196/956724973685321818/car-g8e430ecb9_1920.jpg",
//   },
// ];

{
  /* 6 items */
}
// {data?.map((d, i) => (
//   <Card_temp_2 key={i} data={d} />
// ))}
// {data?.map((d, i) => (
//   <Card_temp_2 key={i} data={d} />
// ))}
export default Challenge;
