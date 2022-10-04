import { useEffect, useState } from "react";
import useSWR from "swr";
import { shootFireworks, fetcher } from "./lib/utils";
import { useRouter } from "next/router";
import styled from "styled-components";
import Success from "../components/success";
const Cont = styled.div`
  height: 100vh;
  display: flex;
  & > div {
    margin: 128px auto 0;
  }
`;
const success = () => {
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
    console.log(error);
    console.log(data);
    if (data && firstLoad) {
      shootFireworks();
      setFirstLoad(false);
    }
  }, [data]);
  return (
    <Cont>
      <div>
        {" "}
        {JSON.stringify(data) && (
          <div>
            <Success />
          </div>
        )}
      </div>
    </Cont>
  );
};

export default success;
