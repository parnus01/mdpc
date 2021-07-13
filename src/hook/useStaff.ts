import { useQuery, useMutation } from "react-query";
import useAxios from "./useAxios";
import client from "../services/axios";

type UpdateConsentReq = {
  staff_id: string;
  consent_version?: string;
}

export const useStaff = (staffId: string) => {
  const {execute} = useAxios();
  const getStaff = (id: string) => () => ({
    method: 'GET',
    url: `api/v1/staff/${id}`
  });
  const updateConsent = ({staff_id, consent_version = ''}: UpdateConsentReq) => () => ({
    method: 'PATCH',
    url: `api/v1/staff`,
    data: {
      staff_id: staff_id,
      consent_version: consent_version
    }
  });

  const fetchStaff = useQuery(['staff', staffId],
    async () => {
      const {result} = await execute({func: getStaff(staffId)});
      return result;
    },
    {
      // The query will not execute until the staffId exists
      enabled: !!staffId,
      retry: false
    });

  const acceptConsent = useMutation((data: UpdateConsentReq) => execute(
    {func: updateConsent(data)}));

  return {
    fetchStaff,
    acceptConsent
  };
};