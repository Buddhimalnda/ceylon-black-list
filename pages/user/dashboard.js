import Link from "next/link";

function UserDashboard() {
  return (
    <div className="container">
      <div className="flex h-full justify-center place-items-center">
        <div className="w-full max-w-2xl shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
          <div className="mb-4 justify-center w-full place-content-center flex font-bold text-2xl">
            <h1>DashBoard | User </h1>
          </div>
          {/* race -  view */}
          {/* crew - view,*/}
          {/* user - uniq */}
          {/* car - add, view */}
          <Link href="/user/carList">Car List</Link>
          {/* challenge - add, view */}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
