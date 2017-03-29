var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');

var orderSchema = new Schema({
    openId: String,
    itemId: String,
    status: {
        type: Number,
        default: 0
    },
    quantity: Number,
    ip: String,
    express: {
        name: String,
        no: String
    },
    address: {
        province: String,
        city: String,
        detail: String,
        tel: String,
        name: String
    },
    created: {
        type: String,
        default: () => {
            return moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }
}, {versionKey: false});

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;
