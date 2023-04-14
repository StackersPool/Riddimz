import React, { useEffect } from 'react';
import { userSession } from './services/wallet';
import DashBoard from './pages/DashBoard';
import LandingPage from './pages/LandingPage';

const App = () => {
    return (
        <div>
            {
                userSession.isUserSignedIn()
                    ? <DashBoard />
                    : <LandingPage />
            }
        </div>
    );
}

export default App;