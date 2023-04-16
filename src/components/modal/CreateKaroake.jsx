import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { wallet } from '../../services/wallet';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
const CreateKaroake = ({ open, close }) => {
    const [caption, setCaption] = React.useState('');
    const file = React.useRef(null);

    const handleCreateKaraoke = () => { wallet.transactions.createKaraoke(caption, file.current.files); }
    const handleInputChange = (e) => { setCaption(e.target.value) }

    return (
        <div>
            <Modal
                open={open}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Create Karaoke</Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1 }} fontSize={13}>
                        Let your voice be heard and your creativity shine! 🎤🎶🌟 Get ready to create some unforgettable karaoke content that will have everyone singing along with you!
                    </Typography>
                    <TextField id="standard-multiline-flexible" label="Add a caption..." multiline maxRows={4} variant="standard" onInput={handleInputChange} />
                    <IconButton color="primary" aria-label="upload picture" component="label" sx={{ margin: 2 }}>
                        <input hidden accept="video/*" type="file" ref={file} />
                        <AttachFileIcon />
                    </IconButton>
                    <Button variant="contained" color='warning' endIcon={<SendIcon color='primary' />} onClick={handleCreateKaraoke}>
                        Create
                    </Button>
                    <Typography id="modal-modal-description" align='center' sx={{ mt: 1 }} fontSize={13}>
                        Powered by Riddimz Karaoke
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
export default CreateKaroake;