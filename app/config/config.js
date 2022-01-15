require('dotenv').config();

module.exports = {

  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  ssl:true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
  //configurar seeders
  seederStorage:'sequelize',
  //seederStoragePath:'sequelizeSeeds.json',
  seederStorageTableName: "Seeds",
  //configurar migrations
  migrationStorage:'sequelize',
  migrationStorageTableName:'Migrations',
  define:{
    underscored:true,
  }
  
}

