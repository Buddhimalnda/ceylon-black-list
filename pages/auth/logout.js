import { removeCookies } from "cookies-next";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { getFirebase } from "../../app/config.firebase";

function Logout() {
  const { auth } = getFirebase();

  const router = useRouter();

  if (auth?.currentUser?.uid) router.push("/");
  const signout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        removeCookies("userId");
        router.push("/").then(() => router.reload());
      })
      .catch((error) => {
        // An error happened.
        console.log(error?.message);
      });
  };
  return (
    <div className="logout" onLoad={signout()}>
      Logout Success
    </div>
  );
}
export default Logout;
