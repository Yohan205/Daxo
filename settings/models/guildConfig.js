const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildConfig = new Schema({
    ID: {type: 'string'},
    prefix: {type: 'string'},
    adminRol: {type: 'string'}
});

module.exports = mongoose.model('guildConfig', guildConfig);