import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import DashBoardHeader from '../components/dashboard/DashBoardHeader'
import AudioVideoMedia from '../components/audio_video/AudioVideoMedia';

export default function SpacingGrid() {
    const [spacing, setSpacing] = React.useState(2);

    const handleChange = (event) => {
        setSpacing(Number(event.target.value));
    };


    return (
        <div className='dashboardheader'>
            <DashBoardHeader />
            <div className='dashboardheadercontent'>
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={spacing}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
                                <Grid key={value} item>
                                    <Paper sx={{ height: 250, width: 250, backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff', }}>

                                        <div>
                                            <AudioVideoMedia />
                                        </div>

                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        </div >
    );
}