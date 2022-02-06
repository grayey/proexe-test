/* eslint-disable react/require-default-props */
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthLayoutProps {
    children: JSX.Element;
    isAuthProtected: boolean | undefined;
}

export default function Authmiddleware({ children, isAuthProtected }: AuthLayoutProps): JSX.Element {
    const auth =  true; //isAuthProtected && !localStorage.getItem('authUser');
    return auth ? children : <Navigate to="/login" />;
}
