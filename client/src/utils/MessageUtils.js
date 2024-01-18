const createMessage = (status, fieldName, obj) => {
    return{
        "status": status,
       [fieldName]: obj,
    }
}

const createEmail = (receivers, subject, body, from, thesisTitle, thesisId, date) => {
    return {
        "to": receivers,
        "message": {
            "subject": subject,
            "text": body,
            "from": from,
            "thesisTitle": thesisTitle,
            "thesisId": thesisId,
            "date": date
        },
    }
}
const MessageUtils = {
    createMessage,
    createEmail
}
export default MessageUtils;