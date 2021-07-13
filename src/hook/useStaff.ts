import { useQuery } from "react-query";
import client from "../services/axios";

export const useStaff = (staffId: string) => {
  const getStaff = async (id: string) => {
    return client.get(`api/v1/staff/${id}`);
  };

  const fetchStaff = useQuery(['staff', staffId],
    () => getStaff(staffId),
    {
      // The query will not execute until the staffId exists
      enabled: !!staffId,
      retry : false
    });
  return {
    fetchStaff
  };
};