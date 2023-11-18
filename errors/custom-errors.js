class CustomAPIErr extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomErr = (msg, statusCode) => {    
   return new CustomAPIErr(msg, statusCode)
}

export { CustomAPIErr, createCustomErr}