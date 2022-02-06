import React from 'react';
import DashboardFooter from './dashboardFooter';
import DashboardHeader from './dashboardHeader';
import "./dashboard.scss"

function DashboardLayout({ children }: any): any {
    return (
        <>
            <DashboardHeader />
            <div className="container">
                <h2 className='mb-4'>
                    Dashboard
                </h2>
                {children}
            </div>
        </>
    );
}

export default DashboardLayout;
