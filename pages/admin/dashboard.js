import Link from "next/link";

function adminDashboard() {
  return (
    <div className="container">
      <div className="flex h-full justify-center place-items-center">
        <div className="w-full max-w-2xl shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
          <div className="mb-4 justify-center w-full place-content-center flex font-bold text-2xl">
            <h1>DashBoard | Admin </h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="link">
              <Link href="/admin/data/addPoints">Add Point</Link>
            </div>
            <div className="link">
              <Link href="/admin/data/addMap">Add Map</Link>
            </div>
            <div className="link">
              <Link href="/admin/data/addCrew">Add Crew</Link>
            </div>
          </div>
          {/* race - add, view, edit */}
          {/* crew - add, view, edit */}
          {/* user - add, view, edit */}
        </div>
      </div>
    </div>
  );
}

export default adminDashboard;
