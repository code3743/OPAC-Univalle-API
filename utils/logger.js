const winston = require('winston');


const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});


const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Agrega el timestamp al registro
    logFormat // Aplica el formato personalizado
  ),
  transports: [
    new winston.transports.File({ filename: './logs/logs.log' , level:'error' }) 
  ]
});

module.exports = logger;
