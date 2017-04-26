var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');

var wuserSchema = new Schema({
    nick: String,
    openId: String,
    unionId: String,
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
