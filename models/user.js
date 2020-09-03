const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 6 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
        return regExp.test(email);
    }
};

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if(username.length < 5 || username.length > 12) {
            return false;
        } else {
            return true;
        }
    }
};

let validUsername = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};

let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if(password.length < 8 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};

let validPassword = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
};

const emailValidators = [
    {
        validator: emailLengthChecker, message: 'E-mail must be between 5 and 30 characters'
    },
    {
        validator: validEmailChecker, message: 'E-mail must have appropriate e-mail format'
    }
]

const usernameValidators = [
    {
        validator: usernameLengthChecker, message: 'Username must be between 6 and 12 characters'
    },
    {
        validator: validUsername, message: 'Username cannot include any special characters'
    }
]

const passwordValidators = [
    {
        validator: passwordLengthChecker, message: 'Password must be between 8 and 35 characters'
    },
    {
        validator: validPassword, message: 'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
    }
]

const userSchema = new Schema({
    email: { type: String, required: true, unique:true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators }
});


userSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();
    
        
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);