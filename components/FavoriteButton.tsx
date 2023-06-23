import React, { useCallback, useMemo } from 'react'
import axios from 'axios';

import useCurrentUser from "@component/hooks/useCurrentUser";
import useFavorites from "@component/hooks/useFavorites";

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    movieId
}) => {
  return (
    <div className=''>

    </div>
  )
}

export default FavoriteButton