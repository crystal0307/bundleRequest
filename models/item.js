var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');

var itemSchema = new Schema({
    name: String,
    brand: String,
    title: String,
    subtitle: String,
    images: [String],
    slides: [String],
    price: Number,
    mPrice: Number,
    type: String,
    isOn: {
      type: Boolean,
      default: false,
    },
    spec: String,
    created: {
        type: String,
        default: () => {
            return moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }
}, {versionKey: false});

var Item = mongoose.model('Item', itemSchema);
module.exports = Item;
