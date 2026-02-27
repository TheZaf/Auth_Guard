import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './emailTemp.js';
import { mailtrapClient, sender } from './mailtrap.config.js';

export const sendVerificationEmail = async (email,verificationToken) =>{
    const recipients = [{email}]
    try {
        const res = await mailtrapClient.send({
            from:sender,
            to:recipients,
            subject:"Verify Your Email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        })
        console.log("verification email sent!",res);
    } catch (error) {
        console.log("Error sending verification email",error);
        throw new Error("Failed to send Verification Email");       
    }
}

export const sendWelcomeEmail = async (email,name) =>{
    const recipient = [{email}];
    try {
       const res = await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid:"253947c4-b217-4467-ae7e-c98d1ec009a6",
            template_variables: {
            "name": name,
            },
        });
        console.log("welcome email sent!",res)
    } catch (error) {
        console.log("Error sending welcome email",error);
        throw new Error("Failed to send Welcome Email");
    }
}

export const sendPasswordResetEmail = async (email,resetURL)=>{
    const recipient = [{email}];
    try {
        const res = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password Reset Request",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:"password reset",
        })
    } catch (error) {
        console.log("error sending password reset email",error);
        throw new Error("Failed to send Password Reset Email",error);
    }

}

export const sendResetSuccessEmail = async(email)=>{
    const recipient =[{email}];
    try {
        const res = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password Reset Successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE
        })
        console.log("password reset success email sent!",res);
    } catch (error) {
        console.log("error sending password reset success email",error);
        throw new Error("Failed to send Password Reset Success Email",error);
    }
}
