"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    server: {
        port: process.env.PORT || 3000,
        name: 'classification',
    },
    authentication: {
        required: false,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018',
    },
};