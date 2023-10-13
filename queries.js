import { Sequelize } from '@sequelize/core';
import 'dotenv/config';
import { Listing } from './ListingModel.js';


const sequelize = new Sequelize(process.env.API_URL); //Connection to my database on ElephantSQL



try {

    await sequelize.authenticate(); //Establish connectyion to database
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
 
      async function retrieveAllListings() { //Outputs all dataValues from each entry in the database

          const line = await Listing.findAll(); //Function to get all listings in the daTABASE 
          console.log(line.every(line => line instanceof Listing)); //Load each entry in databse into line variable
          console.log('Retrieving all listings');
          console.log("All users:", JSON.stringify(line, null, 2)); //Load each entry from database onto console 

      }


    async function findLibraryWest() { //Looks for Library West entry and outputs its corresponding data

        const line = await Listing.findOne({ where: { name: 'Library West' } }); //Looks for the first entry in database with string "Library West" under name columnn and retrieves this instance
        if (line === null) {
            console.log('Not found!');
        } else {
            console.log(line instanceof Listing); //Loads corresponding data into line variable 
            console.log('Finding Library West');
            console.log(line.dataValues); //Outputs dataValues from database onto console 
        }

    }


      async function removeCable() { //Looks for CABL entry and removies it from the database

          console.log('Removing Cable BLDG');
          await Listing.destroy({ //Function to remove an entry from teh database
              where: {
                  code: "CABL" //Finds any entry with code value of "CABL" and deletes the entry
              }
          });

    }


    async function addDSIT() { //Adds a new entry for the DSIT Building into the database 

        console.log('Adding the new DSIT BLDG that will be across from Reitz union. Bye Bye CSE, Hub, and French Fries.');
        const DSIT = await Listing.create({ code: "DSIT", name: "Data Science and IT", latitude: 29.6443466, longitude: -82.3476931, address: "Gainesville, Fl 32603, United States" }); //Function for adding an entry with the corresponding data values

    }


    async function updatePhelpsLab() { //Updates the address for the Phelps Lab entry
 
        const line = await Listing.findOne({ where: { name: 'Phelps Laboratory' } }); //Searches for the first entry with name value of "Phelps Laboratory"
        if (line === null) {
            console.log('Not found!');
        } else {
            console.log(line instanceof Listing); //Loads data into line variable
            console.log('UpdatingPhelpsLab.');
            line.update({ address: "1593 Museum Rd, Gainesville, Fl 32603, United States" }); //Updates address data value and updates it on the ElephantSQL database
        }
 
    }

    
   console.log("Use these calls to test that your functions work. Use console.log statements in each so you can look at the terminal window to see what is executing. Also check the database.") //Unit testing functions
   removeCable(); 
   addDSIT();
   updatePhelpsLab();
   findLibraryWest();
   retrieveAllListings() 
       
  


