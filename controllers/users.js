const fs = require('fs');

const registration = ((req, res) => {
    const regName = new RegExp(/^([a-zA-Z ]){2,30}$/);
    const regMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const regPass = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    const regcontact = new RegExp(/^\d{10}$/);


    let { name, email, pass, contact } = req.body;

    let data = fs.readFileSync('./users/info.txt').toString().split('\n');

    if (name === '' || email === '' || pass === '' || contact === '') {
        res.render('register', { errMsg: "Fields are missing!" });
    }
    else {
        if (regName.test(name) && regMail.test(email) && regPass.test(pass) && regcontact.test(contact)) {
            let flag = checkMail(data);
            if (flag) {
                fs.appendFile('./users/info.txt', `${name},${email},${pass},${contact}\n`, (err) => {
                    if (err) {
                        res.render('register', { errMsg: 'Something went wrong' });
                    } else {
                        res.redirect("/users/welcome/" + email);
                    }
                })
            } else {
                res.render('register', { errMsg: "User Exist!" });
            }
            // }
        }
        else {
            res.render('register', { errMsg: "Please Fill all field in proper way!" });
        }
    }

    function checkMail(data) {
        for (let i = 0; i < data.length - 1; i++) {
            let info = data[i].split(',');
            if (email === info[1]) {
                return false;
            }
        }
        return true;
    }
})

const login = ((req, res) => {
    const regMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const regPass = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    let user = req.body.user;
    let pass = req.body.pass;
    let data = fs.readFileSync('./users/info.txt').toString().split('\n');

    if (user == '' || pass == '') {
        res.render('login', { errMsg: "Fields are missing!" })
    } else {
        if (regMail.test(user) && regPass.test(pass)) {
            let flagUser = checkMail(data);
            let flagPass = checkPass(data);

            if (!flagUser && !flagPass) {
                res.render('login', {succMsg:"login success"});
            }
            else {
                res.render('login', { errMsg: "Enter correct email or password!" });
            }
            res.render('login', { errMsg: "Please Register first!" })
        }
        res.render('login', { errMsg: "Enter correct email or password!" });
    }
    function checkMail(data) {
        for (let i = 0; i < data.length - 1; i++) {
            let info = data[i].split(',');
            if (user === info[1]) {
                return false;
            }
        }
        return true;
    }
    function checkPass(data) {
        for (let i = 0; i < data.length - 1; i++) {
            let info = data[i].split(',');
            if (pass === info[2]) {
                return false;
            }
        }
        return true;
    }
});

module.exports = {
    registration,
    login
}