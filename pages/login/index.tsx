import {useSession, signIn, signOut} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/router";
import {Button} from "@tremor/react";

function LoginPage() {
  const {data: session} = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-2/5 bg-white rounded-lg p-5 drop-shadow-md">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="font-bold text-black text-2xl">
            Welcome {session.user?.name}
          </h1>
          <h2>{session.user?.email}</h2>
          {/* <img height={40} width={40} src={session.user?.image} /> */}
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-2/5 bg-white rounded-lg p-5 drop-shadow-md">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="font-bold text-black text-2xl">Shoo Peeping Toms</h1>
        <Button
          onClick={() =>
            signIn("google", {
              callbackUrl: `${window.location.origin}/admin`,
            })
          }
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
