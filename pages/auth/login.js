import { useState } from "react";
import TextInput from "../../components/input";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { getFirebase } from "../../app/config.firebase";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../features/auth/authSlice";
import { checkCookies, getCookie, setCookies } from "cookies-next";

function LoginUI() {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const { auth } = getFirebase();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const router = useRouter();
  const onSubmit = (e) => {
    // console.log(e);
    signInWithEmailAndPassword(auth, username, passwd)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(Login(user.uid));
        setCookies("userId", user.uid);
        router.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: " + errorMessage);
      });

    e.preventDefault();
  };
  if (checkCookies("userId")) router.back();

  return (
    <div className="login justify-center place-items-center flex h-full">
      <form method="post" onSubmit={(e) => onSubmit(e)}>
        <h1 className="mb-4 text-center underline text-2xl">Login</h1>
        <TextInput type="text" text="User Name" value={(e) => setUsername(e)} />
        <TextInput
          type="password"
          text="Password"
          value={(e) => setPasswd(e)}
        />
        <button
          type="submit"
          className="flex-shrink-0 mb-3  text-sm border-4 text-white py-1 px-2 rounded bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 w-full"
        >
          Login
        </button>
        <hr />
        <Link href="/auth/register" passHref>
          <p className="text-xs mt-2">Create new Account?</p>
        </Link>
      </form>
    </div>
  );
}

export default LoginUI;
