var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');

var wuserSchema = new Schema({
    nick: String,
    openId: String,
    unionId: String,
    status: {
        type: Boolean,
        default: true
    },
    created: {
        type: String,
        default: () => {
            return moment().format('YYYY-MM-DD HH:mm:ss')
        }
    },
    from: {
        parent: String,
        child: String
    }
}, {
    versionKey: false
});

var wUser = mongoose.model('wUser', wuserSchema);
module.exports = wUser;
