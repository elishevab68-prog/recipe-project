
const AppError = require('../utils/AppError');

const validate = (schema, property='body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        
        if (error) {
            return next(new AppError(`Validation erroe: ${error.details[0].message}`,400));
        }
        
        next();
    };
};

module.exports = {
    validate
};