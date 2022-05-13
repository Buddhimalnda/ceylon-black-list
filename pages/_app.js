import "../styles/globals.css";

import store from "../app/store";
import { Provider } from "react-redux";
import App from "./app";
import { useRouter } from "next/router";
import { getFirebase } from "../app/config.firebase";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const { db, auth } = getFirebase();
  const user = auth.currentUser?.uid;
  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user, router]);

  return (
    <Provider store={store}>
      <App Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default MyApp;
