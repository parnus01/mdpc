import { useMutation } from "react-query";
import useAxios from "./useAxios";

type CompareReq = {
  image: Blob;
  staff_id: string;
}

type CompareResp = {}

export const useCompare = () => {
  const {execute} = useAxios();
  const postCompare = (request: any) => () => ({
    method: 'POST',
    url: `api/v1/compare`,
    data: request,
    headers: {"Content-Type": "multipart/form-data"}
  });
  const compare = useMutation((data: CompareReq) => {
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('staff_id', data.staff_id);
    return execute(
      {func: postCompare(formData)});
  });

  return {
    compare
  };
};