import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
const CreateKaroake = ({ open, close }) => {
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
                    <TextField id="standard-multiline-flexible" label="Add a caption..." multiline maxRows={4} variant="standard" />
                    <IconButton color="primary" aria-label="upload picture" component="label" sx={{ margin:2 }}>
                        <input hidden accept="image/*" type="file" />
                        <AttachFileIcon />
                    </IconButton>
                    <Button variant="contained" color='warning' endIcon={<SendIcon color='primary' />}>
                        Create
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
export default CreateKaroake;