const constant      = require(__basePath + 'app/config/constant');
const mongoInstance = require(constant.path.app + 'core/mongo');
const utility       = require(constant.path.app + 'util/utility');
const mongoose      = require('mongoose');

class BaseModel {
    constructor() {
        let schemaDefaultSettings = { 
            toObject    : { virtuals: true },
            toJSON      : { virtuals: true },
            timestamps  : true
        };

        this.connection   = mongoInstance.getConnection('mongoMaster');

        this.models = {
            /* ================== Schema for users table ==================== */
            users: (() => {
                const schema = new mongoose.Schema({
                    _id                 : { type : String, required : true, default: () => (utility.uuid()) },
                    fname               : { type : String, required : true },
                    email               : { type : String, required : true },
                    mobileNo            : { type : String, required : true },
                    password            : { type : String, required : true},
                    createdAt           : { type : Date, default    : Date.now },
                    updatedAt           : { type : Date, default    : Date.now },
                }, schemaDefaultSettings);

                schema.index({ fname        : 1 });
                schema.index({ password     : 1 });

                return this.connection.model('users', schema, 'users');
            })(),

            /* ================== Schema for collections table ==================== */
            collections: (() => {
                const schema    = new mongoose.Schema({
                    _id                     : { type: String, required: true, default: () => (utility.uuid()) },
                    name                    : { type: String, required: true },
                    userId                  : { type: String, required: true },
                    recommendationIds       : [{type: String, ref: "recommendations" }],
                    isDeleted               : { type: Boolean, default: false },
                    createdAt               : { type: Date, default: Date.now },
                    updatedAt               : { type: Date, default: Date.now },
                }, schemaDefaultSettings);

                schema.index({ userId       : 1,    isDeleted   : 1 });
                schema.index({ userId: 1, name: 1 }, { unique: true });
                schema.index({ createdAt    : -1 });
                return this.connection.model('collections', schema, 'collections');
            })(),

            /* ================== Schema for recommendations table ==================== */
            recommendations: (() => {
                const schema    = new mongoose.Schema({
                    _id         : { type: String, required: true, default: () => (utility.uuid()) },
                    title       : { type: String, required: true },
                    category    : { type: String, required: true },
                    meta        : { type: mongoose.Schema.Types.Mixed, default: {} },
                    createdBy   : { type: String, required: true },
                    updatedBy   : { type: String, required: true },
                    createdAt   : { type: Date, default: Date.now },
                    updatedAt   : { type: Date, default: Date.now },
                }, schemaDefaultSettings);

                schema.index({ category : 1 });
                schema.index({ createdAt: -1 });
                schema.index({ title: 1, category: 1 }, { unique: true });
                return this.connection.model('recommendations', schema, 'recommendations');
            })()
        };
    }
}

module.exports = (new BaseModel);