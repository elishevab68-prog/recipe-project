const printMsg = (req, res, next) => {
    //כך מעבירים מידע למידלוור הבא
    req.myDate = new Date();
    req.userName = "admin";
    console.log(`hello ${req.url}`);
    next();
};

module.exports = { printMsg };