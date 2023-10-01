import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#14ba17'
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
 
  const [open, setOpen] = useState(true);
  const [headingUpdate, setHeadingUpdate] = useState(props.title);
  const [contentUpdate, setContentUpdate] = useState(props.content);

  const handleClickOpen = () => {
    setOpen(true);
  };
 function handlerHeaderUpdate(e) {
  e.preventDefault();

    setHeadingUpdate(e.target.value);

  }
  function handlerContentUpdate(e){
    e.preventDefault();

    setContentUpdate(e.target.value);
  }
 
  function SaveNote(e) {

    props.onEdit(props.backendId, props.id, headingUpdate, contentUpdate);

    props.onClose();
  }

  return (
    <div className='fullWidth'>
      <Dialog onClose={props.onClose} aria-labelledby="customized-dialog-title" open={handleClickOpen} fullWidth >
        <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
        <TextField defaultValue={headingUpdate} variant='outlined' fullWidth onChange={handlerHeaderUpdate} />
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <TextField multiline rows={4} fullWidth  variant='outlined' defaultValue={contentUpdate} onChange={handlerContentUpdate} />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={SaveNote} className='mb'>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
