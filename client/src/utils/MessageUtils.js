const createMessage = (status, fieldName, obj) => {
    return{
        "status": status,
       [fieldName]: obj,
    }
}
const MessageUtils = {
    createMessage
}
export default MessageUtils;