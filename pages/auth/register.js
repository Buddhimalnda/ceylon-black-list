import { useState } from "react";
import TextInput from "../../components/input";
import Link from "next/link";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirebase } from "../../app/config.firebase";

function Login() {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [email, setEmail] = useState("");
  const [icName, setIcName] = useState("");
  const [mdt, setMdt] = useState("");
  const router = useRouter();
  const { auth, db } = getFirebase();
  const onSubmit = (e) => {
    createUserWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        // Signed in
        const userID = userCredential.user.uid;
        const data = {
          role: "racer",
          logo: mdt,
          name: username,
          icTno: icName,
        };
        setDoc(doc(db, "users", userID), data).then(() => router.push("/"));

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    e.preventDefault();
  };

  return (
    <div className="login justify-center place-items-center flex h-full">
      <form method="post" onSubmit={(e) => onSubmit(e)}>
        <h1 className="mb-4 text-center underline text-2xl">Register</h1>
        <TextInput type="text" text="User Name" value={(e) => setUsername(e)} />
        <TextInput
          type="password"
          text="Password"
          value={(e) => setPasswd(e)}
        />
        <TextInput type="email" text="Email" value={(e) => setEmail(e)} />
        <div className="grid grid-cols-2">
          <div className="mb-2 mr-2">
            <TextInput
              type="text"
              text="IC Number"
              value={(e) => setIcName(e)}
            />
          </div>
          <div className="mb-2 ml-2">
            <TextInput
              type="text"
              text="Profile Pictures"
              value={(e) => setMdt(e)}
            />
          </div>
        </div>
        <button className="flex-shrink-0 mb-3  text-sm border-4 text-white py-1 px-2 rounded bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 w-full">
          Sign Up
        </button>
        <hr />
        <Link href="/auth/login" passHref>
          <p className="text-xs mt-2">Allready have account?</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
