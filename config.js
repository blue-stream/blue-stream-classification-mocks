exports.config = {
    server: {
        port: process.env.PORT || 3000,
        name: 'classification',
    },
    authentication: {
        required: false,
        secret: process.env.SECRET_KEY || 'bLue5tream@classiFiCaToR.MoCks',
    },
};