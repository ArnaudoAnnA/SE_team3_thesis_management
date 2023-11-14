const checkId = (id, email) => {
    return email.toLowerCase().includes(id.toLowerCase())
}

const StringUtils = {
    checkId
}

export default StringUtils