var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');
const _ = require('lodash');

var bundleSchema = new Schema({
    inventory: Number,
    name: String,
    isActive: Boolean,
    items: [
        {
            name: String,
            description: String,
            details: [String],
            experiences: [String],
            discounts: [String],
            images: [String]
        }
    ],
    applies: [
        {
            _id: false,
            openId: String,
            time: {
                type: String,
                default: () => {
                    return moment().format('YYYY-MM-DD HH:mm:ss')
                }
            }
        }
    ],
    created: {
        type: String,
        default: () => {
            return moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }
}, {versionKey: false});

var Bundle = mongoose.model('Bundle', bundleSchema);
module.exports = Bundle;
