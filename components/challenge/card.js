import { useRouter } from "next/router";
import { useState, Fragment, useRef } from "react";

const Card = ({ data, ids }) => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const challenge = data?.main;
  const acceptCount = data?.acceptCount;
  const router = useRouter();
  return (
    <div
      className="card mx-2 rounded shadow-md"
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
      }}
    >
      {data?.raceType.label}
      <div className="details text-white text-sm">
        {data?.chllengeType.label} <br />
        {data?.chllengerName.label} challenge you to {data?.map.label}, type{" "}
        {data?.mapType.label}
        <br />@{data?.date} in {data?.time}
        <br />
        <div className="price text-lg font-bold text-red-600">
          {data?.priceValue}
        </div>
      </div>
      <div className="go-corner" href="#">
        <button
          type="button"
          data-modal-toggle="defaultModal"
          onClick={() => router.push(`challenge/${ids}`)}
        >
          <div className="go-arrow">→</div>
        </button>
      </div>
    </div>
  );
};
export default Card;
