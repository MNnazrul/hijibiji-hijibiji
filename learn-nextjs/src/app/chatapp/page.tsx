"use client";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { useState } from "react";

function Home() {
  const [flag, setFlag] = useState<boolean>(false);
  const changeFlag = () => {
    setFlag((prevFlag) => !prevFlag);
  };
  return (
    <div>
      <Sidebar />
      {/* <div>chatApp</div> */}
      <Button variant="link" size="lg" onClick={changeFlag}>
        Click Me
      </Button>

      <div>{flag ? "this is it" : ""}</div>
    </div>
  );
}

export default Home;
