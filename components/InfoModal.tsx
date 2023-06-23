import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModalStore from "@component/hooks/useInfoModelStore";
import useMovie from "@component/hooks/useMovie";

interface InfooModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfooModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId } = useInfoModalStore();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, []);


  return <div>InfoModal</div>;
};

export default InfoModal;
