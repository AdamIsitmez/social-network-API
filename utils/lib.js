function isEmail(email) {
    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/.test(email);
}

module.exports = isEmail