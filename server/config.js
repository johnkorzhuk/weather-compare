import morgan from 'morgan'
import compression from 'compression'

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || '0.0.0.0'
}

const isProd = config.NODE_ENV === 'production'

export const mwConfig = app => {
  if (isProd) {
    app.use(compression())
  }
  app.use(morgan('dev'))
}

export default config
