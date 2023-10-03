import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { makeRequest, verifyEmail } from "../../util/ApiClient";
import SwashaContainer from "../../components/SwashaContainer";
import Link from "next/link";

export default function () {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [remaining, setRemaining] = useState(10);
  useEffect(() => {
    if (!done) return;
    const inter = setInterval(() => {
      setRemaining((v) => {
        if (!v) {
          clearInterval(inter);
          router.push("/");
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => {
      clearInterval(inter);
    };
  }, [done]);
  useEffect(() => {
    if (!router.query.token) return;
    makeRequest(
      verifyEmail,
      { token: router.query.token },
      {
        onSuccess: (res) => {
          setDone(true);
        },
      }
    );
  }, [router.query.token]);
  return (
    <SwashaContainer>
      <div className="flex flex-row h-screen items-center justify-center">
        {!done ? (
          "verifying email..."
        ) : (
          <>
            Your email is verified, redirecting to home in {remaining} seconds,
            or&nbsp;<Link href="/">click here</Link>
          </>
        )}
      </div>
    </SwashaContainer>
  );
}
