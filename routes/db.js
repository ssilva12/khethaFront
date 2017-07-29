
/**
 * Este modulo es para setear la base de datos que se va a utilizar
 * @autor: Ernesto Sebastian Melgin
 * @email: emelgin@intergrupo.com
 * @date: 2016-01-13
 */


var fs = require('fs')
    , cfenv = require('cfenv')
    , path = require('path');

exports.dbCredentials = {
    dbName: 'hackaton',       // candidatos
};

var dbCredentials = exports.dbCredentials;
//console.log(fs);

/**
 * @name conectarBD
 * @description Abre la base de datos de Cloudant (CouchDB)
 * @param id
 * @param first_name
 * @param last_name
 * @param doc_type
 * @param doc_id
 * @param attachments
 * @returns returns
 */
exports.connect = function(dbName) {
    var dbase = dbCredentials.dbName;
    if (dbName !== undefined)
        dbase = dbName;

    process.env.VCAP_SERVICES = fs.readFileSync(path.join(__dirname, '/../VCAP_SERVICES.json')).toString();
    if (process.env.VCAP_SERVICES) {
        var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
        if (vcapServices.cloudantNoSQLDB) {
            dbCredentials.host = vcapServices.cloudantNoSQLDB[0].credentials.host;
            dbCredentials.port = vcapServices.cloudantNoSQLDB[0].credentials.port;
            dbCredentials.user = vcapServices.cloudantNoSQLDB[0].credentials.username;
            dbCredentials.password = vcapServices.cloudantNoSQLDB[0].credentials.password;
            dbCredentials.url = vcapServices.cloudantNoSQLDB[0].credentials.url;
            exports.cloudant = require('cloudant')(dbCredentials.url);
            // check if DB exists if not create
            exports.cloudant.db.get(dbase, function(err, res) {
                if (res == undefined) {
                    exports.cloudant.db.create(dbase, function(err, res) {
                        if (err) { console.log('could not create db. Reason: ', err.reason); }
                    });
                } else { console.log("Connected to DataBase: " + dbase); }

            });

            db = exports.cloudant.use(dbase);
            return db;

        } else {
            console.warn('Could not find Cloudant credentials in VCAP_SERVICES environment variable - data will be unavailable to the UI');
            return null;
        }
    }
}