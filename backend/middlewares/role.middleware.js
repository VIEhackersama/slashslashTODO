module.exports = function (...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ status: 'error', message: 'Chưa xác thực người dùng' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ status: 'error', message: 'Không có quyền truy cập' });
        }

        next();
    };
};
