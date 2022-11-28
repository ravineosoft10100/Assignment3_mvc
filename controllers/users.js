const fs = require('fs');

const registration = ((req, res) => {
    let { name, email, pass, city } = req.body;

    if (name === '' || email === '' || pass === '' || city === '')
        res.render('register', { errMsg: 'Field are Missing!' });
    else if (fs.existsSync(`./users/${email}.txt`)) {
        res.render('register', { errMsg: 'Email Already Registered..' });
    } else {
        fs.writeFile(`./users/${email}.txt`, `${name}\n${email}\n${pass}\n${city}`, (err) => {
            if (err) {
                res.render('register', { errMsg: 'Someting went wrong' });
            } else {
                res.render('register', { succMsg: 'Registered Successfully' });
                // if(fs.existsSync(`./users/.txt`)){
                //     res.render('login');
                // }else{
                //     res.render('register');
                // }

            }
        })
    }
})


const login = ((req, res) => {
    let { mail, pass } = req.body;

    if (mail === '' || pass === '') {
        res.render('login', { errMsg: 'Field are Missing!' });
    }
    else {
        if (fs.existsSync(`./users/${mail}.txt`)) {
            let data = fs.readFileSync(`users/${mail}.txt`);
            data = data.toString().split('\n');
            if (mail === data[1] && pass === data[2]) {
                // res.render('login',{succMsg:'login success'});
                res.render('login_wel', { name: data[0] });
            }
            else {
                res.render('login', { errMsg: 'Incorrect email or password!' });
            }
        }else{
            res.render('login',{errMsg:"User not found!"})
        }
        // res.render('login', { errMsg: 'login failed' })
    }
})

module.exports = {
    registration,
    login
}