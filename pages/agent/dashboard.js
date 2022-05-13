import Race from "../race";

function AgentDashboard() {
  return (
    <div className="container">
      <div className="flex h-full justify-center place-items-center">
        <div className="w-full max-w-5xl shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
          <div className="mb-4 justify-center w-full place-content-center flex font-bold text-2xl">
            <h1>DashBoard | Agent </h1>
          </div>
          <div className="body grid grid-cols-2">
            {/* race - add, view, edit */}
            <Race />
            {/* crew - add, view, edit */}
            {/* user - add, view, edit */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentDashboard;
