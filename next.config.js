const { Domain } = require('domain')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ["lh3.googleusercontent.com"]
    }
}

module.exports = nextConfig
