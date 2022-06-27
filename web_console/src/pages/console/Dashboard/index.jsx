import React, { useEffect } from "react";

const  Dashboard = () => {

    useEffect(() => {
        console.log('Dashboard Page mounted.');
    },[]);

    return (
        <div>
            This is the Dashboard page.
        </div>
    );
}
export default Dashboard;