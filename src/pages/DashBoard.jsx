import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import DashBoardHeader from '../components/dashboard/DashBoardHeader'
import AudioVideoMedia from '../components/audio_video/AudioVideoMedia';

export default function SpacingGrid() {
    const [spacing, setSpacing] = React.useState(2);
    const [karoakeContents, setKaraokeContents] = React.useState([]);

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
                            {karoakeContents.length > 0 ? karoakeContents.map(({ publisher, caption, type, uri, txId }) => (
                                <Grid key={txId} item>
                                    <Paper sx={{ height: 250, width: 250, backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff', }}>
                                        <div>
                                            <AudioVideoMedia type={type} caption={caption} uri={uri} />
                                        </div>
                                    </Paper>
                                </Grid>
                            )) : <Grid item><p>Loading</p></Grid>}
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        </div >
    );
}