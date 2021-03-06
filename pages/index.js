import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuth } from "../app/config.firebase";
import { Login, logout } from "../features/auth/authSlice";
import styles from "../styles/Home.module.css";

export default function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuth((user) => (user ? dispatch(Login(user)) : console.log("No User")));
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Black list App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <button onClick={() => dispatch(login())}>Login</button> */}
      {/* <button onClick={() => dispatch(logout())}>logout</button> */}
    </div>
  );
}
