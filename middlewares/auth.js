const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminauthorized = token === "xyz";
    if (!isAdminauthorized) {
        res.status(401).send("Unauthorized");
    } else {
        next();
    }
}
const userAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminauthorized = token === "xyz";
    if (!isAdminauthorized) {
        res.status(401).send("Unauthorized");
    } else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}