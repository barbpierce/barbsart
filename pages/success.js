import { useEffect } from "react";
import useSWR from "swr";
import { shootFireworks, fetcher } from "./lib/utils";
const success = () => {
  const { data, error } = useSWR(
    () => `/api.checkout_sessions/${session_id}`,
    fetcher
  );

  useEffect(()=>{
    if (data) {
      shootFireworks();
    }
  },[])
  return <div>success</div>;
};

export default success;

