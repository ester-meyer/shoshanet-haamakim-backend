const corsOptions = {
  origin: "https://shoshanet-haamakim-frontend.onrender.com",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = corsOptions;