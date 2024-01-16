const createMessage = (status, fieldName, obj) => {
    return{
        "status": status,
       [fieldName]: obj,
    }
}

const createEmail = (receivers, subject, body, from, thesisTitle) => {
    return {
        "to": receivers,
        "message": {
            "subject": subject,
            "text": body,
            "from": from,
            "thesisTitle": thesisTitle
        },
    }
}
const MessageUtils = {
    createMessage,
    createEmail
}
export default MessageUtils;