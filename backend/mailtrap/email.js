import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email,verificationToken) => {
    const recipient = [{email}];
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your E-Mail",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "E-Mail Verification"
        })
        console.log("Verification mail sent successfully",response);
    }
    catch(error){
        console.log("Error sending Verification E-Mail: ",error);
        throw new Error(`Error sending Verification E-Mail: ${error}`);
    }
}

export const sendWelcomeEmail = async (email,name) => {
    const recipient = [{email}];
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "858c7794-073f-4dfe-abe5-56c1549ae156",
            template_variables: {
                "name": name
            }
        });
        console.log("Welcome mail sent successfully",response);
    }
    catch(error){
        console.log("Error sending Welcome E-Mail: ",error);
        throw new Error(`Error sending Welcome E-Mail: ${error}`);
    }
}

export const sendResetPasswordEmail = async (email,resetUrl) => {
    const recipient = [{email}];
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetUrl),
            category: "Password Reset"
        });
        console.log("Reset Password mail sent successfully",response);
    }
    catch(error){
        console.log("Error sending Reset Password E-Mail ",error.message);
        throw new Error(`Error sending Reset Password E-Mail :${error.message}`);
    }
}

export const sendResetSuccessMail = async (email) => {
    const recipient = [{email}];
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Password Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
        console.log("Password Reset successful mail sent ",response);
    }
    catch(error){
        console.log("Error sending Password Reset successful E-Mail ",error.message);
        throw new Error(`Error sending Password Reset successful E-Mail :${error.message}`);
    }
}