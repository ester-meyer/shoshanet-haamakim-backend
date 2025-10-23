var corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL2
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

module.exports = corsOptions;