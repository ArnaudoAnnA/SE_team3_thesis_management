const checkId = (id, email) => {
    return email.toLowerCase().includes(id.toLowerCase())
}
const createApplicationPath = (dir, user, thesisId, file ) => {
    const path = dir + user + "_" + thesisId + "/" + file
    return path
}
const StringUtils = {
    checkId,
    createApplicationPath
}



export default StringUtils