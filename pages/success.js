import { useEffect, useState } from "react";
import useSWR from "swr";
import { shootFireworks, fetcher } from "./lib/utils";
import { useRouter } from "next/router";
import styled from "styled-components";
import SuccessPopup from "../components/success";
import {clearLocalStorage} from "./lib/utils";

const Cont = styled.div`
  height: 100vh;
  display: flex;
  & > div {
    margin: 0 auto;
  }
`;
const Success = () => {
  const {
    query: { session_id },
  } = useRouter();
  const router = useRouter();
  const [firstLoad, setFirstLoad] = useState(true);
  console.log(session_id);
  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout-session/${session_id}` : null,
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data && firstLoad) {
      shootFireworks();
      setFirstLoad(false);
      clearLocalStorage();
      
    }
  }, [data]);
  return (
    <Cont>
      <div>
       
        {JSON.stringify(data) ? (
          <div className="mar-top-md">
            <SuccessPopup />
          </div>
        ) : (
          <p> You aren't supposed to be here </p>
        )}
      </div>
    </Cont>
  );
};

export default Success;
