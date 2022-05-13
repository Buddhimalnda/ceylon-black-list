import { useRouter } from "next/router";
function Race() {
  const router = useRouter();
  return (
    <div className="race flex h-full justify-center place-items-center">
      <div className="w-full max-w-2xl shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
        <h1 className="text-center text-2xl font-bold mb-4">Race Menu</h1>
        <button
          className="btn-race"
          onClick={() => router.push("/race/addRace")}
        >
          Create Race
        </button>
        <button className="btn-race">update Race</button>
        <button
          className="btn-race"
          onClick={() => router.push("/race/result")}
        >
          Race result
        </button>
        <button className="btn-race" onClick={() => router.push("/user/race")}>
          User Race results
        </button>
      </div>
    </div>
  );
}

export default Race;
