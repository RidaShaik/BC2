import { Sequelize, DataTypes } from '@sequelize/core';
import 'dotenv/config';
import * as fs from 'fs';
import { Listing } from './ListingModel.js';

const sequelize = new Sequelize(process.env.API_URL); //URL connection to Elephant SQl

//console.log(process.env.PORT);
//console.log(process.env.API_Key);

 try {
  
  await Listing.sync({ force: true }); //Listing model made for database
  console.log("The table for the Listing model was just (re)created!");

  fs.readFile('listings.json', 'utf8', function(err, data) { //Read JSON Listing file with all data

    if (err) throw err;
      console.log(data);

   const listData = JSON.parse(data)['entries']; //Parse data read from JSON file
  
 
      const Listing = sequelize.define('Listing', { //Same model from the ListingModel.js file
          code: {
              type: DataTypes.STRING,
              default: false
          },
          name: {
              type: DataTypes.STRING,
              default: false
          },
          latitude: {
              type: DataTypes.DOUBLE,
              allowNull: true,
              default: false
          },
          longitude: {
              type: DataTypes.DOUBLE,
              allowNull: true,
              default: false
          },
          address: {
              type: DataTypes.STRING(1234),
              allowNull: true,
              default: false
          }
      }, {
          tableName: 'Listings'
      });

      (async () => {
          await sequelize.sync({ force: true }); //Function to add all entries from JSON file to ElephantSQL database
          for (const entry of listData) {
              await Listing.create({
                  code: entry.code || null, //Code column
                  name: entry.name || null, //Name column
                  latitude: entry.coordinates ? entry.coordinates.latitude || null : null, //Latitude column taking into account that its a subsection from the crdinate data value
                  longitude: entry.coordinates ? entry.coordinates.longitude || null : null, //Longitude column taking into account that its a subsection from the crdinate data value
                  address: entry.address || null, //Address Column
              });
          }
          await sequelize.close();
      })();
    });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
