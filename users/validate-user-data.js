function validateUserData(req, res, next) {
    const userData = req.body;
    if (!userData.username) {
        res.status(400).json({ errorMessage: 'missing required username field' });
    } else if (!userData.password) {
        res.status(400).json({ errorMessage: 'missing required password field' });
    } else {
        console.log('user validated');
        next();
    }
}

module.exports = validateUserData;