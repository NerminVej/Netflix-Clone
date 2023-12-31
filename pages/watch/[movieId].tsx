import React from "react";

import useMovie from "@component/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query; // Retrieve the "movieId" from the router query parameters

  const { data } = useMovie(movieId as string); // Fetch the movie data using the "useMovie" hook and the movieId

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="
        fixed
        w-full
        p-4
        z-10
        flex
        flex-row
        items-center
        gap-8
        bg-black
        bg-opacity-70
        "
      >
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching</span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        src={data?.videoUrl}
        className="h-full w-full"
      ></video>
    </div>
  );
};

export default Watch;
