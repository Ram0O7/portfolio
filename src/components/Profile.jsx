"use client";
import { signOut, useSession } from "next-auth/react";
import { AiFillAlert } from "react-icons/ai";
import { useThemeContext } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import Card from "./ui/Card";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const revalidateBlogs = async (path) => {
  await fetch(`/api/revalidate/?path=/${path}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err.message));
  console.log("blogs successfully revalidated!");
};

export default function Profile() {
  const { data: session, status } = useSession();
  const { theme } = useThemeContext();
  const inputRef = useRef(null);
  const [pathToRevalidate, setPathToRevalidate] = useState("/");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    inputRef.current.value = "";
    revalidateBlogs(pathToRevalidate);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      !(
        status === "authenticated" &&
        (session?.user?.email === "ram706860@gmail.com" || session?.user?.email === "rairamkrishn90@gmail.com")
      ) && router.back();
    }, 1000);
    return () => clearTimeout(timer);
  }, [status, session, router]);

  if (
    status === "authenticated" &&
    (session.user.email === "ram706860@gmail.com" || session.user.email === "rairamkrishn90@gmail.com")
  ) {
    return (
      <Card>
        <div className="relative overflow-hidden rounded-full w-28 h-28">
          <Image
            src={session.user?.image}
            alt="profile image"
            width={112}
            height={112}
            priority={true}
            className="object-cover !m-0"
          />
        </div>
        <h1 className="text-3xl font-extrabold mb-6">
          {session?.user.name || "Lalit"}
        </h1>

        <button
          className={`btn after:bg-${theme}-secondary-accent relative uppercase tracking-widest pb-1`}
          onClick={() => {
            signOut();
            router.push("/");
          }}
        >
          sign out
        </button>
        <form
          action="submit"
          className="flex flex-col gap-5 text-sm font-bold"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              ref={inputRef}
              type="text"
              placeholder="ex. blogs/[slug]"
              className="resize-y text-sm p-1"
              required
              onChange={() => setPathToRevalidate(inputRef.current.value)}
            />
          </div>
          <button
            type="submit"
            className={`btn after:bg-${theme}-secondary-accent relative uppercase tracking-widest pb-1`}
          >
            revalidate blogs
          </button>
        </form>
        <button
          className={`btn after:bg-${theme}-secondary-accent relative uppercase tracking-widest mt-4 font-bold pb-1`}
          onClick={() => router.back()}
        >
          go back
        </button>
      </Card>
    );
  }
  return (
    <div className="min-w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 flex-wrap justify-center items-center">
      <h1
        className={`text-2xl sm:text-3xl text-${theme}-secondary-accent font-bold`}
      >
        unauthorized access attempted!
      </h1>
      <AiFillAlert className="text-red-700 text-3xl sm:text-4xl animate-pulse" />
    </div>
  );
}
