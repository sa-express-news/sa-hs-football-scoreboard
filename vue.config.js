const path  = require('path');

const isProduction = () => process.env.NODE_ENV === 'production';

module.exports = {
  baseUrl: isProduction() ? '//s3.amazonaws.com/projects.expressnews.com/hs-football-scoreboard/' : '/',
}