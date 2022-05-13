import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFirebase,
  streamCrew,
  steamPoints,
  streamChallenge,
  streamCar,
  streamMap,
  streamUser,
} from "../app/config.firebase";
import { Login, setUser } from "../features/auth/authSlice";
import { setCrew } from "../features/crew/slice";
import { setPoint } from "../features/points/slice";
import { setChallenge } from "../features/challenge/slice";
import Left from "../components/nav/Left";
import BottomBar from "../components/nav/bottom";
import { XIcon } from "@heroicons/react/solid";
import Loading from "../components/loading";
import { useRouter } from "next/router";

function App({ Component, pageProps }) {
  const state = useSelector((state) => state);
  // if (state.auth.user) console.log("user");
  const dispatch = useDispatch();
  console.log(state);
  const { db, auth } = getFirebase();
  const user = auth.currentUser?.uid;

  useEffect(() => {
    if (auth.currentUser?.uid) {
      const userCol = doc(db, "users", auth.currentUser?.uid);
      onSnapshot(userCol, (snap) => {
        const user = snap.data();
        dispatch(setUser(user));
        dispatch(Login(snap.id));
      });
    }
  }, [db, auth.currentUser?.uid, state.auth.user, dispatch]);

  useEffect(() => {
    if (state.auth.user) {
      const { stream } = streamCrew();
      stream((crews) => {
        dispatch(
          setCrew(
            crews.map((d) => ({
              id: d.id,
              name: d.name,
              logo: d.logo,
              count: d.count,
              color: d.code,
            }))
          )
        );
      });
    }
  }, [db, state.auth.user, dispatch]);

  useEffect(() => {
    if (state.auth.user) {
      const { stream } = steamPoints();
      stream((points) => {
        dispatch(
          setPoint(
            points.map((d) => ({
              id: d.id,
              crew: d.crew,
              value: d.value,
              members: d.member,
            }))
          )
        );
      });
    }
  }, [db, state.auth.user, dispatch]);

  useEffect(() => {
    if (state.auth.user) {
      const { stream } = streamChallenge();
      stream((challenges) => {
        dispatch(
          setChallenge(
            challenges.map((d) => ({
              id: d.id,
              challengeCrew: {
                lable: d.chllengeCrew.label,
                value: d.chllengeCrew.value,
              },
              challengeName: {
                lable: d.chllengerName.label,
                value: d.chllengerName.value,
              },
              map: { lable: d.map.label, value: d.map.value },
              mapType: { lable: d.mapType.label, value: d.mapType.value },
              raceType: { lable: d.raceType.label, value: d.raceType.value },
              time: d.time,
              date: d.date,
              price: d.priceValue,
            }))
          )
        );
      });
    }
  }, [db, state.auth.user, dispatch]);
  const { isConfigured } = getFirebase();

  if (!isConfigured) {
    return <Loading />;
  } else
    return (
      <div id="container" className="">
        <div className="btn-x fixed top-3 right-3">
          <XIcon className="h-8 w-8 text-white hover:text-slate-800" />
        </div>
        <div className="left-menu">
          <Left />
        </div>
        <Component {...pageProps} />
        <div className="bottom-menu fixed bottom-3 right-3">
          {/* <BottomBar /> */}
        </div>
      </div>
    );
}

export default App;
