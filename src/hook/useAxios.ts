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
      console.log('test')
      !skipLoading && state.activeLoading();
      const result = await axios(func());
      !skipLoading && state.inactiveLoading();
      return {
        result: result?.data,
        error: null,
      };
    } catch (error) {
      console.error(error)
      return {
        result: null,
        error,
      };
    }
  };

  return {
    execute,
  };
};
export default useAxios;
