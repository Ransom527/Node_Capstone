exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://moosecraft:80529357@ds153659.mlab.com:53659/node-capstone-db';
                      //'mongodb://GRB-MBP.local/quizAppDB';
                      
exports.PORT = process.env.PORT || 8080;