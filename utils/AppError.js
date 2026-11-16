class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'AppError';
    }
}

module.exports = AppError;