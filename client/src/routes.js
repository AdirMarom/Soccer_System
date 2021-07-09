import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/About",
    name: "About",
    component: () => import("./pages/AboutPage")
  },
  {
  path: "/CurrStageGames",
  name: "CurrStageGames",
  component: () => import("./pages/CurrStageGames")
},
{
  path: "/AddGameToSys",
  name: "AddGameToSys",
  component: () => import("./pages/AddGameToSys")
},
{
  path: "/FavoriteGames",
  name: "FavoriteGames",
  component: () => import("./pages/FavoriteGames")
},
{
  path: "/Team/:team_name",
  name: "Team",
  component: () => import("./pages/TeamPage")
},
{
  path: "/Player/:Player_id",
  name: "Player",
  component: () => import("./pages/PlayerPage")
},
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
