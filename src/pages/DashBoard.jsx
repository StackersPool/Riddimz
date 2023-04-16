import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import DashBoardHeader from '../components/dashboard/DashBoardHeader'
import AudioVideoMedia from '../components/audio_video/AudioVideoMedia';
import { getPerfomance, wallet } from '../services/wallet';
// import { TextField } from '@mui/material';

export default function SpacingGrid() {
    const [spacing, setSpacing] = React.useState(2);
    const [karoakeContents, setKaraokeContents] = React.useState([]);
    const [contractBody, setContractBody] = React.useState('');
    const [contractName, setContractName] = React.useState('');

    const handleChange = (event) => {
        setSpacing(Number(event.target.value));
    };
    const handleCodeBodyInput = (e) => {
        setContractBody(e.target.value)
    }

    const contractNameInput = (e) => {
        setContractName(e.target.value)
    }

    React.useEffect(() => {
        const loadPerfomance = async () => {
            const performance = getPerfomance();
            setKaraokeContents(performance)
        }
        loadPerfomance();
    }, [])

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
                                            <Typography>Performered by: {publisher}</Typography>
                                        </div>
                                    </Paper>
                                </Grid>
                            )) : <Grid item><p>Loading</p></Grid>}

                            {/* <TextField id="standard-multiline-flexible" label="Contract Body..." multiline maxRows={4} variant="standard" onInput={handleCodeBodyInput} />
                            <TextField id="standard-multiline-flexible" label="Contract nam.." maxRows={4} variant="standard" onInput={contractNameInput} />
                            <button onClick={() => wallet.transactions.deployContract(contractBody, contractName)}>Deploy Contract</button> */}
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        </div >
    );
}