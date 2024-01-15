module.exports = {
    checkAuth: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            return res.redirect('/login')
        }
    },
    checkAuthDiscord: function(req, res, next) {
        if (!req.isAuthenticated()) return res.redirect('/login');
        if (req.user.provider !== 'discord') {    
            return res.redirect('/test')
        }
        return next()
    },
    statusAuth: function(req, res) {
        if (req.isAuthenticated()) {
            return true
        } else {
            return false
        }
    }
}