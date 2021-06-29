import { useState, useCallback } from "react";

const useProcess = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, [isLoading]);

  const endLoading = useCallback(() => {
    setIsLoading(false);
  }, [isLoading]);

  return { isLoading, startLoading, endLoading };
};

export default useProcess;
