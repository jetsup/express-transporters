import { MysqlError, OkPacket } from "mysql";
import { Transporter } from "../src/db/queries";
import express from "express";


// CARGO
export const cargoCreateRouter = express.Router().get("/cargo/create", async (req, res, next) => {
    const customers = await new Promise((resolve, reject) => {
        Transporter.getCustomers((err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);
        });
    });

    const drivers = await new Promise((resolve, reject) => {
        Transporter.getDrivers(true, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    res.render("cargo_create", {
        title: "Create Cargo",
        customers: customers,
        drivers: drivers,
    });
});

export const cargoCreatePostRouter = express.Router().post("/cargo/create", async (req, res, next) => {
    const reqBody = req.body;
    const customer: number = reqBody.customer;
    const shipmentName: string = reqBody.shipment_name;
    const weight: number = reqBody.weight;
    const value: number = reqBody.value;
    const origin: string = reqBody.origin;
    const destination: string = reqBody.destination;
    const driver1: number = reqBody.driver1;
    let driver2: number | null = reqBody.driver2;

    // return await new Promise((resolve, reject) => {
    let shipment: number = -1;
    let trip: number = -1;

    return await new Promise((resolve, reject) => {
        Transporter.createShipment(shipmentName, weight, value, customer, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            console.log("Res:", result)
            shipment = result.insertId;
            console.log("insertID", shipment)


            if (driver2 == -1) driver2 = null;
            console.log("Driver2: ", driver2)
            Transporter.createTrip(origin, destination, driver1, driver2, (err: MysqlError | null, result: any) => {
                if (err) {
                    // reject(err);
                    res.json({ error: `An error occurred -> ${err.message}` });
                    return;
                }
                resolve(result);

                trip = result.insertId;

                console.log("Trip:", trip, "Shipment:", shipment);
                Transporter.createTripShipment(trip, shipment, (err: MysqlError | null, result: any) => {
                    if (err) {
                        // reject(err);
                        res.json({ error: `An error occurred -> ${err.message}` });
                        return;
                    }
                    resolve(result);

                    let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
                    res.redirect(prevUrl)
                });
            });
        });
    });
});

export const cargoViewRouter = express.Router().get("/", async (req, res, next) => {
    const customers = await new Promise((resolve, reject) => {
        Transporter.getCustomers((err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);
        });
    });

    const drivers = await new Promise((resolve, reject) => {
        Transporter.getDrivers(true, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    res.render("cargo_view", {
        title: "Express Transporters",
        customers: customers,
        drivers: drivers,
    });
});

export const cargoAPIRouter = express.Router().get("/api/cargos", async (req, res, next) => {
    const cargos = await new Promise((resolve, reject) => {
        Transporter.getCargos((err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    console.log(cargos)
    res.json(cargos);
});
// export const homeRouter = express.Router().
//     get("/", async (req, res, next) => {
//         // TODO: get all the transport diary entries

//         res.render("index", {
//             title: "Homey",
//             // diary: transportDiary,
//         });
//     });

// Brand
export const brandCreateRouter = express.Router().get("/brand/create", (req, res, next) => {
    res.render("brand_create", {
        title: "Create Brand"
    });
});

export const brandCreatePostRouter = express.Router().post("/brand/create", async (req, res, next) => {
    const reqBody = req.body;

    const brand: string = reqBody.brand;

    return await new Promise((resolve, reject) => {
        Transporter.createBrand(brand, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
            return;
        });

        let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
        res.redirect(prevUrl);
    });
});

export const brandDeleteRouter = express.Router().post("/brand/delete/:truckID", async (req, res, next) => {
    await new Promise((resolve, reject) => {
        Transporter.deleteBrand(Number(req.params.truckID), (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
    res.redirect(prevUrl);
});

export const brandViewRouter = express.Router().get("/brand/view", (req, res, next) => {
    res.render("brand_view", {
        title: "View Brand"
    });
});

export const brandsAPIRouter = express.Router().get("/api/brands", async (req, res, next) => {
    const trucks = await new Promise((resolve, reject) => {
        Transporter.getBrands((err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    res.json(trucks);
});

// Truck
export const truckCreateRouter = express.Router().get("/truck/create", async (req, res, next) => {
    const dealtBrands = await new Promise((resolve, reject) => {
        Transporter.getBrands((err: MysqlError | null, brands: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(brands);
        });
    });

    console.log("Brands: ", dealtBrands);

    res.render("truck_create", {
        title: "Create Truck",
        brands: dealtBrands,
    });
});

export const truckCreatePostRouter = express.Router().post("/truck/create", async (req, res, next) => {
    const reqBody = req.body;

    const brand: number = reqBody.brand;
    const load: number = reqBody.load;
    const capacity: number = reqBody.capacity;
    const year: string = reqBody.year;
    const repairs: number = reqBody.repairs;

    return await new Promise((resolve, reject) => {
        Transporter.createTruck(brand, load, capacity, year, repairs, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
            return;
        });

        let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
        res.redirect(prevUrl)
    });
});

export const truckViewRouter = express.Router().get("/truck/view", async (req, res, next) => {
    res.render("truck_view", {
        title: "View Trucks",
    });
});

export const truckEditRouter = express.Router().get("/truck/view/:truckID", async (req, res, next) => {
    const trucks: Array<unknown> = await new Promise((resolve, reject) => {
        Transporter.getTruck(Number(req.params.truckID), (err: MysqlError | null, result: any) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            console.log("Truck:", result);
            resolve(result);
        });
    });

    const truck = trucks[0];

    const brands = await new Promise((resolve, reject) => {
        Transporter.getBrands((err: MysqlError | null, brands: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(brands);
        });
    });

    res.render("truck_edit", {
        title: "Truck View",
        truck: truck,
        brands: brands,
    });
});

export const truckUpdateRouter = express.Router().post("/truck/update/:truckID", async (req, res, next) => {
    await new Promise((resolve, reject) => {
        const truckID = Number(req.params.truckID);
        const reqBody = req.body;
        const brand = reqBody.brand;
        const load = reqBody.load;
        const capacity = reqBody.capacity;
        const year = reqBody.year;
        const repairs = reqBody.repairs;

        Transporter.updateTruck(truckID, brand, load, capacity, year, repairs, (err: MysqlError | null, result: any) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            console.log("Truck:", result);
            resolve(result);
        });
    });

    let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
    res.redirect(prevUrl);
});

export const truckDeleteRouter = express.Router().post("/truck/delete/:truckID", async (req, res, next) => {
    await new Promise((resolve, reject) => {
        Transporter.deleteTruck(Number(req.params.truckID), (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
    res.redirect(prevUrl);
});

export const trucksAPIRouter = express.Router().get("/api/trucks", async (req, res, next) => {
    const trucks = await new Promise((resolve, reject) => {
        Transporter.getTrucks(true, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    res.json(trucks);
});

// Employee
export const employeeCreateRouter = express.Router().get("/employee/create", async (req, res, next) => {
    const seniorities = await new Promise((resolve, reject) => {
        Transporter.getSeniorities((err: MysqlError | null, brands: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(brands);
        });
    });


    res.render("employee_create", {
        title: "Create Employee",
        seniorities: seniorities,
    });
});

export const employeeCreatePostRouter = express.Router().post("/employee/create", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const firstName: string = reqBody.name;
        const surname: string = reqBody.surname;
        const seniority: number = reqBody.seniority;


        Transporter.createEmployee(firstName, surname, seniority, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
            return;
        });

        let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
        res.redirect(prevUrl)
    });
});

export const employeeEditRouter = express.Router().get("/employee/view/:employeeID", async (req, res, next) => {
    const seniorities = await new Promise((resolve, reject) => {
        Transporter.getSeniorities((err: MysqlError | null, brands: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(brands);
        });
    });

    const employeeArr: Array<unknown> = await new Promise((resolve, reject) => {
        Transporter.getEmployee(Number(req.params.employeeID), false, (err: MysqlError | null, brands: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(brands);
        });
    });

    const employee = employeeArr[0];

    res.render("employee_edit", {
        title: "Create Employee",
        seniorities: seniorities,
        employee: employee,
    });
});

export const employeeUpdateRouter = express.Router().post("/employee/view/:employeeID", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const firstName: string = reqBody.name;
        const surname: string = reqBody.surname;
        const seniority: number = reqBody.seniority;


        Transporter.updateEmployee(Number(req.params.employeeID), firstName, surname, seniority, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
            return;
        });

        let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
        res.redirect(prevUrl)
    });
});

export const employeeDeleteRouter = express.Router().post("/employee/delete/:employeeID", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const firstName: string = reqBody.name;
        const surname: string = reqBody.surname;
        const seniority: number = reqBody.seniority;


        Transporter.deleteEmployee(Number(req.params.employeeID), (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
            return;
        });

        let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
        res.redirect(prevUrl)
    });
});

export const employeeViewRouter = express.Router().get("/employee/view", async (req, res, next) => {
    res.render("employee_view", {
        title: "View Employees",
    });
});

export const employeesAPIRouter = express.Router().get("/api/employees", async (req, res, next) => {
    const trucks = await new Promise((resolve, reject) => {
        Transporter.getEmployees(true, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    res.json(trucks);
});

// Driver
export const driverCreateRouter = express.Router().get("/driver/create", async (req, res, next) => {
    const categories = await new Promise((resolve, reject) => {
        Transporter.getDriverCategories((err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    });

    const employees = await new Promise((resolve, reject) => {
        Transporter.getEmployees(true, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    });

    res.render("driver_create", {
        title: "Create Driver",
        categories: categories,
        employees: employees,
    });
});

export const driverCreatePostRouter = express.Router().post("/driver/create", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const employeeID: number = reqBody.employee;
        const category: number = reqBody.category;


        Transporter.createDriver(employeeID, category, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

export const driverViewRouter = express.Router().get("/driver/view", async (req, res, next) => {
    res.render("driver_view", {
        title: "View Drivers",
    });
});


export const driverEditRouter = express.Router().get("/driver/view/:driverID", async (req, res, next) => {
    const categories = await new Promise((resolve, reject) => {
        Transporter.getDriverCategories((err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    });

    const driverArr: Array<unknown> = await new Promise((resolve, reject) => {
        Transporter.getDriver(Number(req.params.driverID), false, (err: MysqlError | null, result: any) => {
            if (err) {
                res.json({ error: `Make sure the driver exist in the database.\n${err.message}` });
                return;
            }
            resolve(result)
        });
    });

    const driver = driverArr[0];
    console.log("Driver:", driver);

    if (driver) {
        const employeeArr: Array<unknown> = await new Promise((resolve, reject) => {
            const employeeID = (driver as { employee_id: number }).employee_id;

            console.log("EmployeeID: ", employeeID);

            Transporter.getEmployee(employeeID, true, (err: MysqlError | null, result: any) => {
                if (err) {
                    res.json({ error: `Make sure the employee exist in the database.\n${err.message}` });
                    return;
                }
                resolve(result);
            });
        });

        console.log("Employee:", employeeArr)

        const employee = employeeArr[0];

        if (employee) {
            res.render("driver_edit", {
                title: "View Drivers",
                driver: driver,
                employee: employee,
                categories: categories,
            });
        }
    }
});

export const driverUpdateRouter = express.Router().post("/driver/view/:driverID", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const driverID = Number(req.params.driverID);
        const category: number = reqBody.category;


        Transporter.updateDriver(driverID, category, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

export const driverDeleteRouter = express.Router().post("/driver/delete/:driverID", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const driverID = Number(req.params.driverID);
        const category: number = reqBody.category;


        Transporter.deleteDriver(driverID, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});


export const driverAPIRouter = express.Router().get("/api/driver", async (req, res, next) => {
    const drivers = await new Promise((resolve, reject) => {
        Transporter.getDrivers(true, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    res.json(drivers);
});

// Mechanic
export const mechanicCreateRouter = express.Router().get("/mechanic/create", async (req, res, next) => {
    const brands = await new Promise((resolve, reject) => {
        Transporter.getBrands((err: MysqlError | null, brands: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(brands);
        });
    });

    const employees = await new Promise((resolve, reject) => {
        Transporter.getEmployees(true, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    });

    res.render("mechanic_create", {
        title: "Create Mechanic",
        brands: brands,
        employees: employees,
    });
});

export const mechanicCreatePostRouter = express.Router().post("/mechanic/create", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const employeeID: number = reqBody.employee;
        const brand: number = reqBody.brand;


        Transporter.createMechanic(employeeID, brand, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

export const mechanicEditRouter = express.Router().get("/mechanic/view/:mechanicID", async (req, res, next) => {
    const brands = await new Promise((resolve, reject) => {
        Transporter.getBrands((err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    });

    const mechanicArr: Array<unknown> = await new Promise((resolve, reject) => {
        Transporter.getMechanic(Number(req.params.mechanicID), false, (err: MysqlError | null, result: any) => {
            if (err) {
                res.json({ error: `Make sure the mechanic exist in the database.\n${err.message}` });
                return;
            }
            resolve(result)
        });
    });

    const mechanic = mechanicArr[0];

    if (mechanic) {
        const employeeArr: Array<unknown> = await new Promise((resolve, reject) => {
            const employeeID = (mechanic as { employee_id: number }).employee_id;

            Transporter.getEmployee(employeeID, true, (err: MysqlError | null, result: any) => {
                if (err) {
                    res.json({ error: `Make sure the employee exist in the database.\n${err.message}` });
                    return;
                }
                resolve(result);
            });
        });

        const employee = employeeArr[0];

        console.log(mechanic, brands, employee)

        if (employee) {
            res.render("mechanic_edit", {
                title: "View Mechanic",
                mechanic: mechanic,
                employee: employee,
                brands: brands,
            });
        }
    }
});

export const mechanicUpdateRouter = express.Router().post("/mechanic/view/:mechanicID", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const employeeID: number = reqBody.employee;
        const brand: number = reqBody.brand;


        Transporter.updateMechanic(Number(req.params.mechanicID), brand, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

export const mechanicViewRouter = express.Router().get("/mechanic/view", async (req, res, next) => {
    res.render("mechanic_view", {
        title: "View Mechanics",
    });
});

export const mechanicDeleteRouter = express.Router().post("/mechanic/delete/:driverID", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const driverID = Number(req.params.driverID);


        Transporter.deleteMechanic(driverID, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

export const mechanicAPIRouter = express.Router().get("/api/mechanic", async (req, res, next) => {
    const mechanics = await new Promise((resolve, reject) => {
        Transporter.getMechanics(true, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    console.log(mechanics)
    res.json(mechanics);
});
// Repair
export const repairCreateRouter = express.Router().get("/repair/create", async (req, res, next) => {
    res.render("repair_create", {
        title: "Create Repair",
    });
});

export const repairViewRouter = express.Router().get("/repair/view", async (req, res, next) => {
    res.render("repair_view", {
        title: "View Repairs",
    });
});
// Customer
export const customerCreateRouter = express.Router().get("/customer/create", async (req, res, next) => {
    res.render("customer_create", {
        title: "Create Customer",
    });
});

export const customerCreatePostRouter = express.Router().post("/customer/create", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const name: string = reqBody.name;
        const surname: string = reqBody.surname;
        const address: string = reqBody.address;
        const phone1: string = reqBody.phone1;
        const phone2: string = reqBody.phone2;

        Transporter.createCustomer(name, surname, address, phone1, phone2, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

export const customerViewRouter = express.Router().get("/customer/view", async (req, res, next) => {
    res.render("customer_view", {
        title: "View Customers",
    });
});

export const customerEditRouter = express.Router().get("/customer/view/:customerID", async (req, res, next) => {
    const customerArr: Array<unknown> = await new Promise((resolve, reject) => {
        Transporter.getCustomer(Number(req.params.customerID), (err: MysqlError | null, result: any) => {
            if (err) {
                res.json({ error: `Make sure the mechanic exist in the database.\n${err.message}` });
                return;
            }
            resolve(result)
        });
    });

    const customer = customerArr[0];

    res.render("customer_edit", {
        title: "View Customers",
        customer: customer
    });
});

export const customerUpdateRouter = express.Router().post("/customer/view/:customerID", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const name: string = reqBody.name;
        const surname: string = reqBody.surname;
        const address: string = reqBody.address;
        const phone1: string = reqBody.phone1;
        const phone2: string = reqBody.phone2;


        Transporter.updateCustomer(Number(req.params.customerID), name, surname, address, phone1, phone2, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

export const customerDeleteRouter = express.Router().post("/customer/delete/:customerID", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const customerID = Number(req.params.customerID);


        Transporter.deleteCustomer(customerID, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

export const customerAPIRouter = express.Router().get("/api/customer", async (req, res, next) => {
    const customers = await new Promise((resolve, reject) => {
        Transporter.getCustomers((err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    console.log(customers)
    res.json(customers);
});
// Shipment
export const shipmentCreateRouter = express.Router().get("/shipment/create", async (req, res, next) => {
    const customers = await new Promise((resolve, reject) => {
        Transporter.getCustomers((err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);
        });
    })

    res.render("shipment_create", {
        title: "Create Shipment",
        customers: customers,
    });
});

export const shipmentCreatePostRouter = express.Router().post("/shipment/create", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const name: string = reqBody.name;
        const weight: number = reqBody.weight;
        const value: number = reqBody.value;
        const customer: number = reqBody.customer;

        Transporter.createShipment(name, weight, value, customer, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

export const shipmentViewRouter = express.Router().get("/shipment/view", async (req, res, next) => {
    res.render("shipment_view", {
        title: "View Shipments",
    });
});

export const shipmentEditRouter = express.Router().get("/shipment/view/:shipmentID", async (req, res, next) => {
    const shipmentArr: Array<unknown> = await new Promise((resolve, reject) => {
        Transporter.getShipment(Number(req.params.shipmentID), true, (err: MysqlError | null, result: any) => {
            if (err) {
                res.json({ error: `Make sure the mechanic exist in the database.\n${err.message}` });
                return;
            }
            resolve(result)
        });
    });
    const shipment = shipmentArr[0];


    res.render("shipment_edit", {
        title: "View Customers",
        shipment: shipment,
    });
});

export const shipmentUpdateRouter = express.Router().post("/shipment/view/:shipmentID", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const name: string = reqBody.name;
        const weight: number = reqBody.weight;
        const value: number = reqBody.value;

        Transporter.updateShipment(Number(req.params.shipmentID), name, weight, value, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

// TODO: REMOVE BELOW CODE
export const shipmentDeleteRouter = express.Router().post("/shipment/delete/:shipmentID", async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        const reqBody = req.body;
        const shipmentID = Number(req.params.shipmentID);

        Transporter.deleteShipment(shipmentID, (err: MysqlError | null, result: any) => {
            if (err) {
                // reject(err);
                res.json({ error: `An error occurred -> ${err.message}` });
                return;
            }
            resolve(result);

            let prevUrl: string = (req.headers["referer"] === undefined) ? "/" : req.headers["referer"];
            res.redirect(prevUrl)
        });
    });
});

export const shipmentAPIRouter = express.Router().get("/api/shipment", async (req, res, next) => {
    const shipments = await new Promise((resolve, reject) => {
        Transporter.getShipments(true, (err: MysqlError | null, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    console.log(shipments)
    res.json(shipments);
});

export const tripCreateRouter = express.Router().get("/trip/create", async (req, res, next) => {
    res.render("trip_create", {
        title: "Create Trip",
    });
});

export const tripViewRouter = express.Router().get("/trip/view", async (req, res, next) => {
    res.render("trip_view", {
        title: "View Trips",
    });
});

