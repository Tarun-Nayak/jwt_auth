const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    //checking json web token exists & is verified
    if (token) {
        jwt.verify(token, "Tarun-code-area", (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

//check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "Tarun-code-area", async(err, decodedToken) => {
            if (err) {
                res.locals.User = null;
                next();
            } else {
                let user = await user.findById(decodedToken.id);
                res.locals.User = user;
                next();
            }
        });
    } else {
        res.locals.User = null;
        next();
    }
};
module.exports = { requireAuth };