import { Sequelize, DataTypes } from '@sequelize/core';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.API_URL) //URL connectiong to ElephantSQL database

const Listing = sequelize.define('Listing', { //Model for the database
    code: { //Code column
        type: DataTypes.STRING,
        default: false
    },
    name: { //Name columns
        type: DataTypes.STRING,
        default: false
    },
    latitude: { //Latitude column - not under coordinates
        type: DataTypes.DOUBLE,
        allowNull: true, //May not need to be defines for an entry
        default: false
    },
    longitude: { //Longitude column - not under coordinates
        type: DataTypes.DOUBLE,
        allowNull: true, //May not need to be defines for an entry
        default: false
    },
    address: { //Address column
        type: DataTypes.STRING(1234), //Longer string values
        allowNull: true, //May not need to be defines for an entry
        default: false
    }

}, {
  tableName: 'Listings' //Table is names Listings
});


console.log(Listing === sequelize.models.Listing); //Returns Model
console.log(Listing);

export { Listing }; //Exports model to be available to the entire application and ElephantSQl
