const corsOptions = {
  origin: "https://shoshanet-haamakim-frontend.onrender.com",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;
