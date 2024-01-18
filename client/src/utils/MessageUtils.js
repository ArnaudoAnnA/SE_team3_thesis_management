const createMessage = (status, fieldName, obj) => {
    return{
        "status": status,
       [fieldName]: obj,
    }
}

const createEmail = (receivers, subject, body, from, thesisTitle, thesisId, applicationsFlag, strId, date) => {
    return {
        "to": receivers,
        "message": {
            "subject": subject,
            "text": body,
            "from": from,
            "thesisTitle": thesisTitle,
            "thesisId": thesisId,
            "applicationsFlag": applicationsFlag,
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