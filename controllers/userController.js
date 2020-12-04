exports.userController = {

    login: function () {
        console.log("login")
    },

    register: function (req, res) {
        console.log(req.body.email)
        console.log(req.body.username)
        console.log(req.body.password)
        console.log(req.body.repeatPassword)
    }
}
