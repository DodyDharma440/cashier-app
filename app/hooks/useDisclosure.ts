import { useState, useCallback } from "react";

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const onToggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, [isOpen]);

  return { isOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;
