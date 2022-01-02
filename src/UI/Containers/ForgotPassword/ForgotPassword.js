import React, { useState } from 'react'
import styles from './forgotPassword.module.css';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Toast, ToastBody, ToastHeader } from 'reactstrap';
import logo from '../../../assets/myytake-logo.png';
import { useHistory, Link } from 'react-router-dom';
import RegEx from '../../../utils/RegEx/RegEx';

function ForgotPassword() {

    const history = useHistory();

    const [ email, setEmail ] = useState("");
    const [ emailErr, setEmailErr ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ phoneErr, setPhoneErr ] = useState("");
    const [ submitStatus, setSubmitStatus ] = useState("")

    const handleChange = (e) => {
        const { value, name } = e.target;

        if(name === "email"){
            if(isNaN(value) === true){
                setEmail(value);
                setPhone(null);
            }else{
                setPhone(value)
                setEmail(null)
            }
        }
    }

    const checkIsEmpty = () => {
        if(email !== null){
            !RegEx.email.test(email) ? setEmailErr("Please enter valid email address.") : setEmailErr("")
        }
        if(phone !== null){
            !RegEx.phone.test(phone) ? setPhoneErr("Please enter valid mobile number.") : setPhoneErr("")
        }
    }

    const handleChangePassword = () => {
        if( !(emailErr !== "" || phoneErr !== "")){
            // DO SOMETHING
            history.push("/otp")
        }else{
            if(email === ""){
                setEmailErr("Email address can not be empty")
            }
            
            if(phone === ""){
                setPhoneErr("Phone number can not be empty")
            }
        }
    }

    return (
        <div className={styles.wrapper}>
           <div className={styles.header}>
                <img src={logo} alt="logo" className={styles.logo} />
            </div> 
            <div className={styles.container1}>
                <div className={styles.loginSection}>
                    <h4 className="text-center">Forgot Password</h4>
                    <Form>
                        <FormGroup className="mt-4">
                            <Label className={styles.label} for="Email" >Email / Phone</Label>
                            <Input invalid={ emailErr !== "" || phone !== "" } className={styles.input} type="email" name="email" id="Email" placeholder="Email Address / Phone Number" onChange={ (e) => handleChange(e) } onBlur={ () => checkIsEmpty() } />
                            <FormFeedback>{email !== null ? emailErr : phoneErr}</FormFeedback>
                        </FormGroup>
                        <Button size="md" block className={"w-100 mt-2 "+ styles.btn} onClick={() => handleChangePassword()}>Request OTP</Button>
                        <p className={styles.backToLogin}><Link to="/" className={styles.textLink}>Back to login</Link></p>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
