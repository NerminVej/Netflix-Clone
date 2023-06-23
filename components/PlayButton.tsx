import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface PlayButtonProps {
  movieId: string; // The ID of the movie
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  // When the button is clicked, it triggers a navigation to the "/watch/{movieId}" route
  const handleClick = () => {
    router.push(`/watch/${movieId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="
        bg-white
        rounded-md
        py-1 md:py-2
        px-2 md:px-4
        w-auto
        text-xs lg:text-lg
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
      "
    >
      <BsFillPlayFill size={25} className="mr-1" /> {/* Render the play icon */}
      Play
    </button>
  );
};

export default PlayButton;
