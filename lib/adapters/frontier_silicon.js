'use strict';

const tools = require('../tools.js');

function addInstance(ip, device, options) {
    let instance = tools.findInstance(options, 'frontier_silicon', obj => obj.native.ip === ip);

    if (!instance) {
        const id = tools.getNextInstanceID('frontier_silicon', options);
        instance = {
            _id: id,
            common: {
                name: 'frontier_silicon'
            },
            native: {
                IP: ip
            },
            comment: {
                add: 'Frontier UNDOK Device - ' + ip
            }
        };
        options.newInstances.push(instance);
        return true;
    }
    return false;
}

function detect(ip, device, options, callback) {
    let foundInstance = false;

    device._upnp.forEach(upnp => {
        if (!foundInstance && upnp.ST && upnp.ST === 'urn:schemas-frontier-silicon-com:undok:fsapi:1') {
            if (addInstance(ip, device, options)) {
                foundInstance = true;
            }
        }
    });

    callback(null, foundInstance, ip);
}

exports.detect = detect;
exports.type = ['upnp'];
exports.timeout = 500;
