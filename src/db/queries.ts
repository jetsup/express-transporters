import { MysqlError } from "mysql";
import { con } from "./connection";

export const Transporter = {
    createBrand: (brand: string, callback: any) => {
        con.query(
            `INSERT INTO brands (name) VALUES (?)`, brand,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    getBrands: (callback: any) => {
        con.query(`SELECT * FROM brands`, (err: MysqlError | null, result: any) => {
            if (err) {
                console.error("Error:", err);
                callback(err, null);
                return;
            }
            const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
            callback(null, plainResult);
        });
    },
    getSeniorities: (callback: any) => {
        con.query(`SELECT * FROM seniorities`, (err: MysqlError | null, result: any) => {
            if (err) {
                console.error("Error:", err);
                callback(err, null);
                return;
            }
            const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
            callback(null, plainResult);
        });
    },
    createTruck: (brand: number, load: number, capacity: number, year: string, repairs: number, callback: any) => {
        con.query(
            `INSERT INTO trucks (brand, truck_load, capacity, year, repairs) VALUES (?, ?, ?, ?, ?)`,
            [brand, load, capacity, year, repairs],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    getTrucks: (dereference: boolean, callback: any) => {
        con.query(
            (dereference) ?
                `SELECT t.id, b.name AS brand, t.truck_load, t.capacity, t.year, t.repairs FROM trucks t JOIN brands b ON b.id=t.brand`
                : `SELECT * FROM trucks`, (err: MysqlError | null, result: any) => {
                    if (err) {
                        console.error(err);
                        callback(err, null);
                        return;
                    }
                    const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                    callback(null, plainResult);
                }
        );
    },
    getTruck: (truckID: number, callback: any) => {
        con.query(
            `SELECT t.id, b.id AS brand_id, b.name AS brand, t.truck_load, t.capacity, t.year, t.repairs FROM trucks t JOIN brands b ON b.id=t.brand WHERE t.id = ?`,
            truckID,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                callback(null, plainResult);
            }
        );
    },
    updateTruck: (truckID: number, brand: number, load: number, capacity: number, year: string, repairs: number, callback: any) => {
        con.query(`UPDATE trucks SET brand = ?, truck_load = ?, capacity = ?, year = ?, repairs = ? WHERE id = ?`,
            [brand, load, capacity, year, repairs, truckID],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    deleteTruck: (truckID: number, callback: any) => {
        con.query(`DELETE from trucks WHERE id = ?`, truckID, (err: MysqlError | null, result: any) => {
            if (err) {
                console.error(err);
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    },
    createEmployee: (name: string, surname: string, seniority: number, callback: any) => {
        con.query(
            `INSERT INTO employees (name, surname, seniority) VALUES (?, ?, ?)`, [name, surname, seniority],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    getEmployees: (dereference: boolean, callback: any) => {
        con.query(
            dereference ?
                `SELECT e.id, e.name, e.surname, s.seniority FROM employees e JOIN seniorities s ON e.seniority = s.id` :
                `SELECT * FROM employees`, (err: MysqlError | null, result: any) => {
                    if (err) {
                        console.error(err);
                        callback(err, null);
                        return;
                    }
                    const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                    callback(null, plainResult);
                }
        )
    },
    getEmployee: (employeeID: number, dereference: boolean, callback: any) => {
        con.query(
            dereference ?
                `SELECT e.id, e.name, e.surname, s.seniority FROM employees e JOIN seniorities s ON e.seniority = s.id WHERE e.id = ?` :
                `SELECT * FROM employees WHERE id = ?`, employeeID, (err: MysqlError | null, result: any) => {
                    if (err) {
                        console.error(err);
                        callback(err, null);
                        return;
                    }
                    const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                    callback(null, plainResult);
                }
        )
    },
    updateEmployee: (employeeID: number, name: string, surname: string, seniority: number, callback: any) => {
        con.query(
            `UPDATE employees SET name = ?, surname = ?, seniority = ? WHERE id = ?`, [name, surname, seniority, employeeID],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    deleteEmployee: (employeeID: number, callback: any) => {
        con.query(`DELETE FROM employees WHERE id = ?`, employeeID, (err: MysqlError | null, result: any) => {
            if (err) {
                console.error("Error:", err);
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    },
    createDriver: (employeeID: number, category: number, callback: any) => {
        con.query(
            `INSERT INTO drivers (employee_id, category) VALUES (?, ?)`, [employeeID, category],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    getDriverCategories: (callback: any) => {
        con.query(`SELECT * from categories`, (err: MysqlError | null, result: any) => {
            if (err) {
                console.error(err);
                callback(err, null);
                return;
            }
            const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
            callback(null, plainResult);
        });
    },
    getDriver: (driverID: number, dereference: boolean, callback: any) => {
        con.query(
            dereference ?
                `SELECT d.id, e.name, e.surname, d.category FROM employees e JOIN drivers d ON e.id = d.employee_id WHERE d.id = ? ` :
                `SELECT * FROM drivers WHERE id = ?`, driverID,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                callback(null, plainResult);
            }
        )
    },
    getDrivers: (dereference: boolean, callback: any) => {
        con.query(
            dereference ?
                `SELECT d.id, e.name, e.surname, d.category AS category_id, c.category FROM employees e JOIN drivers d ON e.id = d.employee_id JOIN categories c on d.category = c.id` :
                `SELECT * FROM drivers`,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                callback(null, plainResult);
            }
        )
    },
    updateDriver: (driverID: number, category: number, callback: any) => {
        con.query(
            `UPDATE drivers SET category = ? WHERE id = ?`, [category, driverID],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    deleteDriver: (driverID: number, callback: any) => {
        con.query(
            `DELETE FROM drivers WHERE id = ?`, driverID,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    createMechanic: (employeeID: number, specializedBrand: number, callback: any) => {
        con.query(
            `INSERT INTO mechanics (employee_id, brand_specialized) VALUES (?, ?)`, [employeeID, specializedBrand],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    getMechanic: (mechanicID: number, dereference: boolean, callback: any) => {
        con.query(
            dereference ?
                `SELECT m.id, e.name, e.surname, m.specialized_brand FROM employees e JOIN mechanics m ON e.id = m.employee_id WHERE m.id = ? ` :
                `SELECT * FROM mechanics WHERE id = ?`, mechanicID,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                callback(null, plainResult);
            }
        )
    },
    getMechanics: (dereference: boolean, callback: any) => {
        con.query(
            dereference ?
                `SELECT m.id, e.name, e.surname, m.id AS mechanic_id, b.name AS brand FROM employees e JOIN mechanics m ON e.id = m.employee_id JOIN brands b on m.brand_specialized = b.id` :
                `SELECT * FROM mechanics`,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                callback(null, plainResult);
            }
        )
    },
    updateMechanic: (mechanicID: number, specializedBrand: number, callback: any) => {
        con.query(
            `UPDATE mechanics SET brand_specialized = ? WHERE id = ?`, [specializedBrand, mechanicID],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    deleteMechanic: (mechanicID: number, callback: any) => {
        con.query(
            `DELETE FROM mechanics WHERE id = ?`, mechanicID,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    createRepair: (truckID: number, mechanicID: number, estimatedTime: number, callback: any) => {
        con.query(
            `INSERT INTO repairs (truck_id, mechanic_id, estimated_time) VALUES (?, ?, ?)`, [truckID, mechanicID, estimatedTime],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    getRepairs: (callback: any) => {
        con.query(
            `SELECT r.id, t.brand, e.name, e.surname, r.estimated_time FROM repairs r JOIN trucks t ON r.truck_id = t.id JOIN mechanics m ON r.mechanic_id = m.id JOIN employees e ON m.employee_id = e.id`, (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                callback(null, plainResult);
            }
        )
    },
    createCustomer: (name: string, surname: string, address: string, phone1: string, phone2: string, callback: any) => {
        con.query(
            `INSERT INTO customers (name, surname, address, phone1, phone2) VALUES (?, ?, ?, ?, ?)`, [name, surname, address, phone1, phone2],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    getCustomer: (customerID: number, callback: any) => {
        con.query(
            `SELECT * FROM customers WHERE id = ?`, customerID, (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                callback(null, plainResult);
            }
        )
    },
    getCustomers: (callback: any) => {
        con.query(
            `SELECT * FROM customers`, (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                callback(null, plainResult);
            }
        )
    },
    updateCustomer: (customerID: number, name: string, surname: string, address: string, phone1: string, phone2: string, callback: any) => {
        con.query(
            `UPDATE customers SET name = ?, surname = ?, address = ?, phone1 = ?, phone2 = ? WHERE id = ?`, [name, surname, address, phone1, phone2, customerID],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    deleteCustomer: (customerID: number, callback: any) => {
        con.query(
            `DELETE FROM customers WHERE id = ?`, customerID,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    createShipment: (name: string, weight: number, value: number, customerID: number, callback: any) => {
        con.query(
            `INSERT INTO shipments (name, weight, value, customer_id) VALUES (?, ?, ?, ?)`, [name, weight, value, customerID],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    getShipment: (shipmentID: number, dereference: boolean, callback: any) => {
        con.query(
            dereference ?
                `SELECT s.id, s.name, s.customer_id, s.weight, s.value, c.name AS customer_name, c.surname AS customer_surname, c.address FROM shipments s JOIN customers c ON s.customer_id = c.id WHERE s.id = ?` :
                `SELECT * FROM shipments WHERE id = ?`, shipmentID, (err: MysqlError | null, result: any) => {
                    if (err) {
                        console.error(err);
                        callback(err, null);
                        return;
                    }
                    const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                    callback(null, plainResult);
                }
        )
    },
    getShipments: (dereference: boolean, callback: any) => {
        con.query(
            dereference ?
                `SELECT s.id, s.name, s.weight, s.value, c.name AS customer_name, c.surname AS customer_surname, c.address FROM shipments s JOIN customers c ON s.customer_id = c.id` :
                `SELECT * FROM shipments`,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                callback(null, plainResult);
            }
        )
    },
    updateShipment: (shipmentID:number, name: string, weight: number, value: number, callback: any) => {
        con.query(
            `UPDATE shipments SET name = ? , weight = ?, value = ? WHERE id = ?`, [name, weight, value, shipmentID],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    deleteShipment: (shipmentID:number, callback: any) => {
        con.query(
            `DELETE FROM shipments WHERE id = ?`,  shipmentID,
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    createTrip: (
        routeFrom: string,
        routeTo: string,
        driver1ID: number,
        driver2ID: number = -1,
        callback: any
    ) => {
        con.query(
            `INSERT INTO trips (route_from, route_to, driver1_id, driver2_id) VALUES (?, ?, ?, ?)`, [routeFrom, routeTo, driver1ID, driver2ID],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
    getTrips: (callback: any) => {
        con.query(
            `SELECT t.id, t.route_from, t.route_to, d1.name as driver1, d2.name as driver2 FROM trips t JOIN drivers d1 ON t.driver1_id = d1.id LEFT JOIN drivers d2 ON t.driver2_id = d2.id`, (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                    return;
                }
                const plainResult = result.map((row: any) => ({ ...row })); // without the RowDataPacket wrapper
                callback(null, plainResult);
            }
        )
    },
    createTripShipment: (tripID: number, shipmentID: number, callback: any) => {
        con.query(
            `INSERT INTO trip_shipments (trip_id, shipment_id) VALUES (?, ?)`, [tripID, shipmentID],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    console.error("Error:", err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            }
        );
    },
};
