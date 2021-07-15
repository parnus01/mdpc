import axios from "../services/axios";
import { useAppStore } from "../state/app";

interface Props {
  func: any
  skipLoading?: boolean
}

const useAxios = () => {
  const state = useAppStore();
  const execute = async ({func, skipLoading = false}: Props) => {
    try {
      !skipLoading && state.activeLoading();
      const result = await axios(func());
      return {
        result: result?.data,
        error: null,
      };
    } finally {
      !skipLoading && state.inactiveLoading();
    }
  };

  return {
    execute,
  };
};
export default useAxios;
