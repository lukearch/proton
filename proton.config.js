/**@type {import('../../dist').ProtonConfig} */

module.exports = {
  port: 3000,
  logs: {
    exceptions: true,
    middlewares: true
  },
  protonOptions: {
    middlewares: {
      context: true
    }
  },
  environments: {
    production: {
      envFile: {
        path: '.env.production'
      }
    },
    development: {
      envFile: {
        path: '.env.development'
      }
    }
  }
};
