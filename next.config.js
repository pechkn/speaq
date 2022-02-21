/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: process.env.NODE_ENV === 'production' ? '/speaq' : '',
  reactStrictMode: true,
}
