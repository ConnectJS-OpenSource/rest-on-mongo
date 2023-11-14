
const jp = require('jsonpath');
const mongodb = require('mongodb');
const dayjs = require('dayjs');

const defaultFieldSpecs =  {
    "_id": "ObjectId",
    "updated_on" : "Date",
    "$..created_on" : "Date"
}

const converters = {
    ObjectId: (s) => {
        //console.log(s);
        //console.log(mongodb.ObjectId(s).toString());
        return mongodb.ObjectId(s);
    },
    Date : (s) => dayjs(s).toDate()
}

function processJsonFields(jsonObj, fieldsSpec){
    fieldsSpec = fieldsSpec ?? {};
    const specs = {
        ...defaultFieldSpecs,
        ...fieldsSpec
    }
    Object.keys(fieldsSpec).forEach(field => {
        jp.apply(jsonObj, field, (v) => {
            return converters[specs[field]](v) ?? v;
        })
    })

    return jsonObj;
}

module.exports = {
    processJsonFields
}
