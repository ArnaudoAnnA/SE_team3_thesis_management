const createMessage = (status, fieldName, obj) => {
    return{
        "status": status,
       [fieldName]: obj,
    }
}

const createEmail = (receivers, subject, body, from, thesisTitle, thesisId, applicationId, strId, date) => {
    return {
        "to": receivers,
        "message": {
            "subject": subject,
            "html": body,
            "from": from,
            "thesisTitle": thesisTitle,
            "thesisId": thesisId,
            "applicationId": applicationId,
            "strId": strId,
            "date": date
        },
    }
}
const MessageUtils = {
    createMessage,
    createEmail
}
export default MessageUtils;