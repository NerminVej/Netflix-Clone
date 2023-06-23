import React from 'react'
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from 'next/router';


interface PlayButtonProps {
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({
    movieId
}) => {
    const router = useRouter();
  return (
    <div>

    </div>
  )
}

export default PlayButton