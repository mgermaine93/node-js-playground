const generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (locationMessageUrl) => {
    return {
        locationMessageUrl,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}