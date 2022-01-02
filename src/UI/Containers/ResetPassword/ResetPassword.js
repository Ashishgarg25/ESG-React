import React, { useState } from 'react'
import styles from './resetPassword.module.css';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Toast, ToastBody, ToastHeader } from 'reactstrap';
import logo from '../../../assets/myytake-logo.png';
import { useHistory, Link } from 'react-router-dom';
import RegEx from '../../../utils/RegEx/RegEx';

function ResetPassword() {

    const history = useHistory();
    
    const [ newPassword, setNewPassword ] = useState("");
    const [ newPasswordErr, setNewPasswordErr ] = useState("")
    const [ confPassword, setConfPassword ] = useState("");

    const [ resetMessage, setResetMessage ] = useState("")

    const checkIsEmpty = () => {
        if( newPassword === " " || newPassword === "" ){
            setNewPasswordErr("Password should have minimum 8 characters")
        }
    }

    const handleReset = () => {
        if(newPassword === "" || newPasswordErr !== ""){
            setNewPasswordErr("Password should have minimum 8 characters");
        }else{
            //Reset Password
            history.push("/")
            setResetMessage("Password changed successfully")
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img src={logo} alt="logo" className={styles.logo} />
            </div> 
            <div className={styles.container1}>
                <div className={styles.loginSection}>
                    <h4 className="text-center">Reset Password</h4>
                    <Form>
                        <FormGroup className="mt-4">
                            <Label className={styles.label}>New Password</Label>
                            <Input invalid={ newPasswordErr !== "" } className={styles.input} type="password" name="newPassword" placeholder="Enter new password" onChange={ (e) => setNewPassword(e.target.value) } onBlur={ checkIsEmpty } />
                            <FormFeedback>{newPasswordErr}</FormFeedback>
                        </FormGroup>
                        <FormGroup className="mt-4">
                            <Label className={styles.label}>Confirm Password</Label>
                            <Input invalid={ confPassword !== newPassword } className={styles.input} type="password" name="confPassword" placeholder="Enter confirm password" onChange={ (e) => setConfPassword(e.target.value) }/>
                            <FormFeedback> Confirm password should be same as new password. </FormFeedback>
                        </FormGroup>
                        <Button size="md" block className={"w-100 mt-2 "+ styles.btn} onClick={handleReset}>Reset</Button>
                        <p className={styles.backToLogin}><Link to="/" className={styles.textLink}>Back to login</Link></p>
                    </Form>
                </div>
            </div>

            {
                resetMessage ?
                    <Toast className={styles.toast} onClick={() => setResetMessage("")}>
                        <ToastBody className={styles.toastBody}> {resetMessage} </ToastBody>
                    </Toast>
                : null
            }
            
        </div>
    )
}

export default ResetPassword
