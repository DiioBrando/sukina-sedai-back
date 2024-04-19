class ErrorHandler {
    codeErr(error){
        return  error.substring((error.indexOf('-') + 1), error.length).trim();
    }
    messageErr(error) {
        return  error.substring(0, error.indexOf(this.codeErr(error)) - 1).trim();
    }
}

export default new ErrorHandler();