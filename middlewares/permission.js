const checkPermission = (allowedRoles) => {

    const mdl = (req, res, next) => {
        const userRole = req.user.role
        if (allowedRoles.includes(userRole)) {
            next();
        }
        else {
            res.status(403).json({ message: "Access denied"  });
        }
    };
    return mdl;
};

module.exports = checkPermission;