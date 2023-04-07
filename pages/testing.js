import { useState } from "react";

const Testing = () => {
  const [val, setVal] = useState("");
  const fetchFunc = async () => {
    const res = await fetch("/api/graphcms/soldArtpiece", {
      method: "POST",
      body: val,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
      <h5 onClick={fetchFunc}>Click me</h5>
    </div>
  );
};

export default Testing;
