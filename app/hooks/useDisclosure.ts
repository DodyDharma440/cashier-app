import { useState, useCallback } from "react";

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  return { isOpen, onOpen, onClose };
};

export default useDisclosure;
