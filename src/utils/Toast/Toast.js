import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Toast({ error, setError, msg, color }) {

    const vertical = "top";
    const horizontal = "right";

    const handleClose = () => {
        setError(false)
    }
    
    const SlideTransition = (props) => {
        return <Slide {...props} direction="left" />;
    }

    return (
        <>
            <Snackbar 
                open={error} 
                autoHideDuration={6000} 
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                // TransitionComponent={(props) => SlideTransition(props)}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity={ color === "Green" ? "success" : "error"} sx={{ width: '100%' }}>
                {msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Toast
