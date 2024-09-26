import { Outlet } from "react-router-dom";

import { Shell } from "./components/shell";

export const Root = () => {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
};
