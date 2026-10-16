// ***************************************************************************
// Copyright (c) 2017 SAP SE or an SAP affiliate company. All rights reserved.
// ***************************************************************************
var db = null;

// SQL Anywhere's client library installs its own handlers for SIGTERM, SIGINT
// and other signals when it is loaded (DBCAPI is loaded on the first connect),
// and a Node.js process that then gets SIGTERM or SIGINT spins at 100% CPU
// instead of exiting. SA_INSTALL_SIG_HANDLERS=N stops that; Node.js passes
// process.env changes on to the C library, where the client reads them. Set
// the variable before loading the driver to keep the handlers.
if( process.env.SA_INSTALL_SIG_HANDLERS === undefined ) {
    process.env.SA_INSTALL_SIG_HANDLERS = 'N';
}

try {
    // Built by node-gyp on install; N-API keeps it working across Node.js versions
    db = require( "./../build/Release/sqlanywhere.node" );
} catch( err ) {
    throw new Error( "Could not load modules for Platform: '" +
		     process.platform + "', Process Arch: '" + process.arch +
		     "', and Version: '" + process.version + "': " + err.message,
		     { cause: err } );
}
module.exports = db;
