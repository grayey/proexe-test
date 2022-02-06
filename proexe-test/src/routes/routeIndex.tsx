/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Navigate } from 'react-router-dom';
import userRoutes from '../app/views/user/userRoutes';

export interface AppRouteProp {
    path: string;
    component: any;
    exact?: boolean;
    isAuth?: boolean;
    layout?: any;
}

const publicRoutes: Array<AppRouteProp> = [];

const dashboardRoutes: Array<AppRouteProp> = [
    ...userRoutes,
    { path: '/', exact: true, component: () => <Navigate to="/users" /> },
].map((userRoute: AppRouteProp) => {
    userRoute.isAuth = true;
    return userRoute;
});

const appRoutes = [...publicRoutes, ...dashboardRoutes]

export default  appRoutes;
