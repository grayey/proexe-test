/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */

import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import appRoutes, { AppRouteProp } from '../routes/routeIndex';
import Authmiddleware from '../routes/middleware/authMiddleware';
import DashboardLayout from './layout/dashboard/dashboardIndex';

function App(props: any): JSX.Element {
    return (
        
        <Routes>
            {appRoutes.map((route: AppRouteProp) => {
                const { path, component, exact, isAuth, layout, ...rest } = route;
                const Component = component;
                const Layout = isAuth ? DashboardLayout : DashboardLayout;
                const appProps: any = { ...props, ...rest };
                return (
                    <Route
                    key={path}
                        path={path}
                        element={
                            <Authmiddleware isAuthProtected={isAuth}>
                                <Layout>
                                    <Component {...appProps} />
                                </Layout>
                            </Authmiddleware>
                        }
                    />
                );
            })}
        </Routes>
    );
    // return (
    //     <Routes>
    //         {authRoutes.map((route, idx) => (
    //             <Authmiddleware
    //                 {...props}
    //                 path={route.path}
    //                 layout={null}
    //                 component={route.component}
    //                 key={idx}
    //                 isAuthProtected={false}
    //                 exact
    //             />
    //         ))}

    //         {userRoutes.map((route: any, idx: number) => (
    //             <Authmiddleware
    //                 {...props}
    //                 path={route.path}
    //                 layout={null}
    //                 component={route.component}
    //                 key={idx}
    //                 isAuthProtected
    //                 exact
    //             />
    //         ))}
    //     </Routes>
    // );
}

export default App;
