class ErrorOPAC extends Error {
    /**
     * 
     * @param {string} message 
     * @param {string} name 
     */
    constructor(message, name = 'ErrorOPAC') {
        super(message);
        this.name = name;
      }
}

module.exports = ErrorOPAC;