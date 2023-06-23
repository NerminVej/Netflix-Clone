import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import axios from "axios";

import useCurrentUser from "@component/hooks/useCurrentUser";
import useFavorites from "@component/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  // Retrieve the mutateFavorites function from the useFavorites hook
  const { mutate: mutateFavorites } = useFavorites();

  // Fetch the current user data using the useCurrentUser hook
  const { data: currentUser, mutate } = useCurrentUser();

  // Determine if the movie is in the user's favorites using useMemo
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  // Define a callback function to toggle the movie in favorites
  const toggleFavorites = useCallback(async () => {
    let response;

    // If the movie is already a favorite, remove it from favorites
    if (isFavorite) {
      response = await axios.delete(`/api/favorite?movieId=${movieId}`);
    } else {
      // If the movie is not a favorite, add it to favorites
      response = await axios.post("/api/favorite", { movieId });
    }

    // Get the updated favoriteIds from the response data
    const updatedFavoriteIds = response?.data?.favoriteIds;

    // Update the favoriteIds in the current user data
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    // Refresh the favorites data using the mutateFavorites function
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  // Determine which icon to display based on the favorite status
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  // Render the favorite button component
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
