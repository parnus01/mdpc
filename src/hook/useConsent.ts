import { useQuery } from "react-query";
import useAxios from "./useAxios";

type ConsentResp = {
  version: string;
  consent: string
}

export const useConsent = () => {
  const {execute} = useAxios();
  const getConsent = () => {
    return {
      method: 'GET',
      url: `api/v1/consent`,
    };
  };

  const fetchConsent = useQuery<ConsentResp, Error>('consent',
    async () => {
      const {result} = await execute({func: getConsent, skipLoading : true});
      return result;
    },
  );

  return {
    fetchConsent,
  };
};