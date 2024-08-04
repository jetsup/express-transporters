// This script delete all data in the database that was created by seed.ts
// if(err) return; // most error are duplicate found or foreign key constraint

// import { MysqlError } from 'mysql';
// import { con } from './connection';

// const deleteData = async () => {
//     try {
//         await deleteBrands();
//         await deleteTrucks();
//         await deleteEmployees();
//         await deleteDrivers();
//         await deleteMechanics();
//         await deleteRepairs();
//         await deleteCustomers();
//         await deleteShipments();
//         await deleteTrips();
//         await deleteTripShipment();
//     } catch (err) {
//         console.error('Error seeding data:', err);
//     } finally {
//         con.end();
//     }
// };

// const deleteBrands = async () => {
//     con.query(
//         `DELETE FROM brands`,(err: MysqlError | null, result: any) => {
//             if (err) throw err;
//             console.log('Brands deleted');
//         }
//     )
// };

// const deleteTrucks = async () => {
//     con.query(
//         `DELETE FROM trucks`,(err: MysqlError | null, result: any) => {
//             if (err) throw err;
//             console.log('Trucks deleted');
//         }
//     )
// };

// const deleteEmployees = async () => {
//     con.query(
//         `DELETE FROM employees`,(err: MysqlError | null, result: any) => {
//             if (err) throw err;
//             console.log('Employees deleted');
//         }
//     )
// };

// const deleteDrivers = async () => {
//     con.query(
//         `DELETE FROM drivers`,(err: MysqlError | null, result: any) => {
//             if (err) throw err;
//             console.log('Drivers deleted');
//         }
//     )
// };

// const deleteMechanics = async () => {
//     con.query(
//         `DELETE FROM mechanics`,(err: MysqlError | null, result: any) => {
//             if (err) throw err;
//             console.log('Mechanics deleted');
//         }
//     )
// };

// const deleteRepairs = async () => {
//     con.query(
//         `DELETE FROM repairs`,(err: MysqlError | null, result: any) => {
//             if (err) throw err;
//             console.log('Repairs deleted');
//         }
//     )
// };

// const deleteCustomers = async () => {
//     con.query(
//         `DELETE FROM customers`,(err: MysqlError | null, result: any) => {
//             if (err) throw err;
//             console.log('Customers deleted');
//         }
//     )
// };

// const deleteShipments = async () => {
//     con.query(
//         `DELETE FROM shipments`,(err: MysqlError | null, result: any) => {
//             if (err) throw err;
//             console.log('Shipments deleted');
//         }
//     )
// };

// const deleteTrips = async () => {
//     con.query(
//         `DELETE FROM trips`,(err: MysqlError | null, result: any) => {
//             if (err) throw err;
//             console.log('Trips deleted');
//         }
//     )
// };

// const deleteTripShipment = async () => {
//     con.query(
//         `DELETE FROM shipment_trips`,(err: MysqlError | null, result: any) => {
//             if (err) throw err;
//             console.log('Trip Shipment deleted');
//         }
//     )
// };

// // delete data
// deleteData();


import { exec } from 'child_process';
import path from 'path';

const sqlFilePath = path.resolve(__dirname, '../../resources/scripts/schema.sql');
const command = `mysql -u root -p < ${sqlFilePath}`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing SQL script: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error output: ${stderr}`);
        return;
    }
    console.log(`SQL script executed successfully:\n${stdout}`);
});
