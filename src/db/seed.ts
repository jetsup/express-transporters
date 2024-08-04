// This script creates dummy data in the database for testing purposes
// if(err) return; // most error are duplicate found or foreign key constraint

import { MysqlError } from 'mysql';
import { con } from './connection';
import { Transporter } from './queries';
import { faker } from '@faker-js/faker';

// Number of records to seed
const seedBrandCount = 10;
const seedTruckCount = 20;
const seedEmployeeCount = 120;
const seedDriverCount = 20;
const seedMechanicCount = 20;
const seedRepairsCount = 20;
const seedCustomersCount = 20;
const seedShipmentsCount = 200;
const seedTripsCount = 250;


const seedData = async () => {
    try {
        await seedBrands();
        await seedTrucks();
        await seedEmployees();
        await seedDrivers();
        await seedMechanics();
        await seedRepairs();
        await seedCustomers();
        await seedShipments();
        await seedTrips();
        await seedTripShipment();
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        con.end();
    }
};

const seedBrands = async () => {
    for (let i = 0; i < seedBrandCount; i++) {
        const name = faker.company.name().substring(0, 20);
        Transporter.createBrand(name, (err: MysqlError | null, result: any) => {
            if (err) throw err;
            console.log(`Brand(${i}) created`, result);
        });
    }
}

const seedTrucks = async () => {
    for (let i = 0; i < seedTruckCount; i++) {
        const brandId = faker.number.int({ min: 1, max: seedBrandCount });
        const load = faker.number.int({ min: 100, max: 10000 });
        const year = faker.number.int({ min: 2000, max: 2024 }).toString();
        const capacity = faker.number.int({ min: 20, max: 100 });
        const repairs = faker.number.int({ min: 0, max: 20 });

        Transporter.createTruck(brandId, load, capacity, year, repairs, (err: MysqlError | null, result: any) => {
            if (err) throw err;
            console.log(`Truck(${i}) created`, result);
        });
    }
};

const seedEmployees = async () => {
    for (let i = 0; i < seedEmployeeCount; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const seniority = faker.number.int({ min: 1, max: 8 });

        Transporter.createEmployee(firstName, lastName, seniority, (err: MysqlError | null, result: any) => {
            if (err) throw err;
            console.log(`Employee(${i}) created`, result);
        })
    }
};

const seedDrivers = async () => {
    for (let i = 0; i < seedDriverCount; i++) {
        const employeeId = faker.number.int({ min: 1, max: seedEmployeeCount });
        const categoryID = faker.number.int({ min: 1, max: 5 });

        Transporter.createDriver(employeeId, categoryID, (err: MysqlError | null, result: any) => {
            if (err) return;
            console.log(`Driver(${i}) created`, result);
        });
    }
};

const seedMechanics = async () => {
    for (let i = 0; i < seedMechanicCount; i++) {
        const employeeId = faker.number.int({ min: 1, max: seedEmployeeCount });
        const brandID = faker.number.int({ min: 1, max: seedBrandCount });

        Transporter.createMechanic(employeeId, brandID, (err: MysqlError | null, result: any) => {
            if (err) return;
            console.log(`Mechanic(${i}) created`, result);
        });
    }
};

const seedRepairs = async () => {
    for (let i = 0; i < seedRepairsCount; i++) {
        const truckID = faker.number.int({ min: 1, max: seedTruckCount });
        const mechanicID = faker.number.int({ min: 1, max: seedMechanicCount });
        const repairTime = faker.number.int({ min: 1, max: 40 });

        Transporter.createRepair(truckID, mechanicID, repairTime, (err: MysqlError | null, result: any) => {
            if (err) return;
            console.log(`Repair(${i}) created`, result);
        });
    }
};

const seedCustomers = async () => {
    for (let i = 0; i < seedCustomersCount; i++) {
        const firstName = faker.person.firstName();
        const surname = faker.person.lastName();
        const address = faker.location.streetAddress();
        const phone1 = faker.phone.number().substring(0, 12);
        const phone2 = faker.phone.number().substring(0, 12);

        Transporter.createCustomer(firstName, surname, address, phone1, phone2, (err: MysqlError | null, result: any) => {
            if (err) throw err;
            console.log(`Customer(${i}) created`, result);
        });
    }
};

const seedShipments = async () => {
    for (let i = 0; i < seedShipmentsCount; i++) {
        const customerID = faker.number.int({ min: 1, max: seedCustomersCount });
        const weight = faker.number.int({ min: 100, max: 10000 });
        const value = faker.number.int({ min: 1000, max: 3000000 });
        const shipmentName = faker.lorem.word({ length: { min: 5, max: 10 } });

        Transporter.createShipment(shipmentName, weight, value, customerID, (err: MysqlError | null, result: any) => {
            if (err) throw err;
            console.log(`Shipment(${i}) created`, result);
        });
    }
};

const seedTrips = async () => {
    for (let i = 0; i < seedTripsCount; i++) {
        const driver1ID = faker.number.int({ min: 1, max: seedDriverCount });
        let driver2ID: number | null = faker.number.int({ min: 1, max: seedDriverCount });
        const from = faker.location.city();
        const destination = faker.location.city();

        if (i % 3 == 0) { driver2ID = null; }

        Transporter.createTrip(from, destination, driver1ID, driver2ID, (err: MysqlError | null, result: any) => {
            if (err) return;
            console.log(`Trip(${i}) created`, result);
        });
    }
};

const seedTripShipment = async () => {
    for (let i = 0; i < seedTripsCount; i++) {
        const shipmentID = faker.number.int({ min: 1, max: seedShipmentsCount });
        const tripID = faker.number.int({ min: 1, max: seedTripsCount });

        Transporter.createTripShipment(tripID, shipmentID, (err: MysqlError | null, result: any) => {
            if (err) return;
            console.log(`TripShipment(${i}) created`, result);
        });
    }
};

// Seed the database
seedData();
