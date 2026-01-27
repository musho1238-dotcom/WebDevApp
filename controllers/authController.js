const authService = require("../services/authService");

class AuthController {
    showRegister(req, res) {
        res.render("register", { error: null });
    }

    async register(req, res) {
        try {
            const { email, fullName, password } = req.body;
            const user = await authService.register({ email, fullName, password });

            // CRITICAL FIX 1: Explicitly save userId for the favorites controller
            req.session.userId = user.id;

            // Store user details for display (e.g., "Hello, Name")
            req.session.user = { id: user.id, email: user.email, fullName: user.fullName };

            // CRITICAL FIX 2: Redirect directly to search, not home
            res.redirect("/search");
        } catch (err) {
            res.status(400).render("register", { error: err.message });
        }
    }

    showLogin(req, res) {
        res.render("login", { error: null });
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await authService.login({ email, password });

            // CRITICAL FIX 1: Save userId here too
            req.session.userId = user.id;

            req.session.user = { id: user.id, email: user.email, fullName: user.fullName };

            // CRITICAL FIX 2: Redirect directly to search
            res.redirect("/search");
        } catch (err) {
            res.status(400).render("login", { error: err.message });
        }
    }

    logout(req, res) {
        req.session.destroy(() => {
            // Optional: clear the cookie for extra security
            res.clearCookie('connect.sid');
            res.redirect("/login");
        });
    }
}

module.exports = new AuthController();