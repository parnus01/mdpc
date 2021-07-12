import { useMutation } from "react-query";

export const useCompare = () => {
  type CompareData = {
    image : string;
    staff_id : string;
  }
   const postCompare = async (data: CompareData) => {
     return await fetch('https://httpbin.org/post', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
     });
   }
  const compare = useMutation((data : CompareData) => postCompare(data))
  return {
     compare
  }
}