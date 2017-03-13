var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');

var userSchema = new Schema({
    openId: String,
    unionId: String,
    hospitalId: String,
    created: {
        type: Date,
        default: Date.now
    },
    address: {
        huJi: {
            district: String,
            street: String,
            detail: String
        },
        juZhu: {
            district: String,
            street: String,
            detail: String
        }
    },
    shares: [String],
    applies: [
        {
            _id: false,
            bundleId: String,
            province: String,
            city: String,
            tel: String,
            detail: String,
            name: String,
            time: {
                type: String,
                default: () => {
                    return moment().format('YYYY-MM-DD HH:mm:ss')
                }
            }
        }
    ],
    preBorn: String,
    packages: [String],
    corrections: [
        {
            hospitalId: String,
            pageId: String,
            content: String,
            _id: false
        }
    ],
    goods: [
        {
            hospitalId: String,
            pageId: String,
            _id: false
        }
    ],
    modals: [String]
}, {versionKey: false});

var User = mongoose.model('User', userSchema);
module.exports = User;
