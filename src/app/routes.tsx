import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Dashboard from "./pages/Dashboard";
import Societies from "./pages/Societies";
import SocietyDetails from "./pages/SocietyDetails";
import Members from "./pages/Members";
import MemberDetails from "./pages/MemberDetails";
import Contributions from "./pages/Contributions";
import ContributionEntry from "./pages/ContributionEntry";
import ContributionDetails from "./pages/ContributionDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "societies", Component: Societies },
      { path: "societies/:id", Component: SocietyDetails },
      { path: "members", Component: Members },
      { path: "members/:id", Component: MemberDetails },
      { path: "contributions", Component: Contributions },
      { path: "contributions/new", Component: ContributionEntry },
      { path: "contributions/:id", Component: ContributionDetails },
    ],
  },
]);
