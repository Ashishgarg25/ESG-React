import React, { useState } from 'react'
import styles from './otp.module.css';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Toast, ToastBody, ToastHeader } from 'reactstrap';
import logo from '../../../assets/myytake-logo.png';
import { useHistory, Link } from 'react-router-dom';
import RegEx from '../../../utils/RegEx/RegEx';

function Otp() {

    const history = useHistory();

    const [ otp, setOtp ] = useState("")
    const [ otpErr, setOtpErr ] = useState("");
    const [ otpValidation, setOtpValidation ] = useState(false)

    const handleOtp = () => {
        if(otp !== ""){
            if(!RegEx.otp.test(otp)){
                setOtpErr("Please enter 4 digit OTP") 
            }else{
                // DO Something
                history.push("/resetPassword")
            }
            

        }else{
            setOtpErr("Please enter 4 digit OTP")
        }
    } 

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img src={logo} alt="logo" className={styles.logo} />
            </div> 
            <div className={styles.container1}>
                <div className={styles.loginSection}>
                    <h4 className="text-center">OTP Validation</h4>
                    <Form>
                        <FormGroup className="mt-4">
                            <Label className={styles.label} >OTP</Label>
                            <Input invalid={ otpErr !== "" } className={styles.input} maxLength={4} type="tel" name="otp" id="Otp" placeholder="Enter 4 digit Otp" onChange={ (e) => setOtp(e.target.value) }/>
                            <FormFeedback>{otpErr}</FormFeedback>
                        </FormGroup>
                        <Button size="md" block className={"w-100 mt-2 "+ styles.btn} onClick={() => handleOtp()}>Validate</Button>
                        <p className={styles.backToLogin}><Link to="/" className={styles.textLink}>Back to login</Link></p>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Otp
