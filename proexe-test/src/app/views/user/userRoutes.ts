import { lazy } from "react";
import { AppRouteProp } from "../../../routes/routeIndex";

const UserOverview = lazy(() => import("./userOverview"));
const AddUser = lazy(() => import("./addUser"));
const EditUser = lazy(() => import("./editUser"));


const userRoutes:Array<AppRouteProp> = [
  {
    exact: true,
    path: "/users",
    component: UserOverview,
  },
  {
    exact: true,
    path: "/users/add",
    component: AddUser,
  },
  {
    exact: true,
    path:"users/:id",
    component:EditUser
  }

];

export default userRoutes;