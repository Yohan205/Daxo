module.exports = {
    checkAuth: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            return res.redirect('/loginDiscord')
        }
    },
    statusAuth: function(req, res) {
        if (req.isAuthenticated()) {
            return true
        } else {
            return false
        }
    }
}