const createMessage = (status, fieldName, obj) => {
    return{
        "status": status,
       [fieldName]: obj,
    }
}

const createEmail = (receivers, subject, body) => {
    return {
        "to": receivers,
        "message": {
            "subject": subject,
            "text": body
        }
    }
}
const MessageUtils = {
    createMessage,
    createEmail
}
export default MessageUtils;