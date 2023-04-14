import React from 'react';
import DashBoardHeader from '../components/dashboard/DashBoardHeader'
import { wallet } from '../services/wallet';

function DashBoard() {
    return (
        <div>
            <div className='dashboardheader'>
                <DashBoardHeader />
            </div>
            <button onClick={() => wallet.logout()}>Logout</button>
        </div>
    );
}

export default DashBoard;