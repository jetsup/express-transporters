import { Transporter } from '../src/db/queries';
import { con } from '../src/db/connection';
import { MysqlError } from 'mysql';

jest.mock('../src/db/connection', () => ({
    con: {
        query: jest.fn(),
    },
}));
/********************************************BRANDS TESTS*******************************************/
// INSERT BRAND
describe('Transporter.createBrand', () => {
    it('should insert a brand and return the result', (done) => {
        const brand = 'Test Brand';
        const mockResult = { insertId: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.createBrand(brand, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO brands (name) VALUES (?)',
                brand,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const brand = 'Test Brand';
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.createBrand(brand, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO brands (name) VALUES (?)',
                brand,
                expect.any(Function)
            );
            done();
        });
    });
});

// RETRIEVE BRANDS
describe('Transporter.getBrands', () => {
    it('should retrieve all brands', (done) => {
        const mockBrands = [{ id: 1, name: 'Brand 1' }, { id: 2, name: 'Brand 2' }];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockBrands);
        });

        Transporter.getBrands((err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockBrands);
            expect(con.query).toHaveBeenCalledWith('SELECT * FROM brands', expect.any(Function));
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getBrands((err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith('SELECT * FROM brands', expect.any(Function));
            done();
        });
    });
});

// UPDATE BRAND
describe('Transporter.updateBrand', () => {
    it('should update a brand and return the result', (done) => {
        const brandId = 1;
        const newBrandName = 'Updated Brand';
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.updateBrand(brandId, newBrandName, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE brands SET name = ? WHERE id = ?',
                [newBrandName, brandId],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const brandId = 1;
        const newBrandName = 'Updated Brand';
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.updateBrand(brandId, newBrandName, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE brands SET name = ? WHERE id = ?',
                [newBrandName, brandId],
                expect.any(Function)
            );
            done();
        });
    });
});

// DELETE BRAND
describe('Transporter.deleteBrand', () => {
    it('should delete a brand and return the result', (done) => {
        const brandId = 1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.deleteBrand(brandId, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM brands WHERE id = ?',
                brandId,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const brandId = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.deleteBrand(brandId, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM brands WHERE id = ?',
                brandId,
                expect.any(Function)
            );
            done();
        });
    });
});


/********************************************TRUCKS TESTS*******************************************/
// CREATE TRUCK
describe('Transporter.createTruck', () => {
    it('should insert a truck and return the result', (done) => {
        const brand = 1;
        const load = 1000;
        const capacity = 2000;
        const year = '2020';
        const repairs = 0;
        const mockResult = { insertId: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.createTruck(brand, load, capacity, year, repairs, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO trucks (brand, truck_load, capacity, year, repairs) VALUES (?, ?, ?, ?, ?)',
                [brand, load, capacity, year, repairs],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const brand = 1;
        const load = 1000;
        const capacity = 2000;
        const year = '2020';
        const repairs = 0;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.createTruck(brand, load, capacity, year, repairs, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO trucks (brand, truck_load, capacity, year, repairs) VALUES (?, ?, ?, ?, ?)',
                [brand, load, capacity, year, repairs],
                expect.any(Function)
            );
            done();
        });
    });
});

// RETRIEVE TRUCKS
describe('Transporter.getTrucks', () => {
    it('should retrieve all trucks with dereference', (done) => {
        const mockTrucks = [
            { id: 1, brand: 'Brand 1', truck_load: 1000, capacity: 2000, year: '2020', repairs: 0 },
            { id: 2, brand: 'Brand 2', truck_load: 1500, capacity: 2500, year: '2021', repairs: 1 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockTrucks);
        });

        Transporter.getTrucks(true, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockTrucks);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT t.id, b.name AS brand, t.truck_load, t.capacity, t.year, t.repairs FROM trucks t JOIN brands b ON b.id=t.brand',
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve all trucks without dereference', (done) => {
        const mockTrucks = [
            { id: 1, brand: 1, truck_load: 1000, capacity: 2000, year: '2020', repairs: 0 },
            { id: 2, brand: 2, truck_load: 1500, capacity: 2500, year: '2021', repairs: 1 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockTrucks);
        });

        Transporter.getTrucks(false, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockTrucks);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM trucks',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getTrucks(true, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT t.id, b.name AS brand, t.truck_load, t.capacity, t.year, t.repairs FROM trucks t JOIN brands b ON b.id=t.brand',
                expect.any(Function)
            );
            done();
        });
    });
});

describe('Transporter.getTruck', () => {
    it('should retrieve a single truck by ID', (done) => {
        const truckID = 1;
        const mockTruck = [
            { id: 1, brand_id: 1, brand: 'Brand 1', truck_load: 1000, capacity: 2000, year: '2020', repairs: 0 },
        ];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockTruck);
        });

        Transporter.getTruck(truckID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockTruck);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT t.id, b.id AS brand_id, b.name AS brand, t.truck_load, t.capacity, t.year, t.repairs FROM trucks t JOIN brands b ON b.id=t.brand WHERE t.id = ?',
                truckID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const truckID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getTruck(truckID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT t.id, b.id AS brand_id, b.name AS brand, t.truck_load, t.capacity, t.year, t.repairs FROM trucks t JOIN brands b ON b.id=t.brand WHERE t.id = ?',
                truckID,
                expect.any(Function)
            );
            done();
        });
    });
});


// UPDATE TRUCK

describe('Transporter.updateTruck', () => {
    it('should update a truck and return the result', (done) => {
        const truckID = 1;
        const brand = 1;
        const load = 1000;
        const capacity = 2000;
        const year = '2020';
        const repairs = 0;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.updateTruck(truckID, brand, load, capacity, year, repairs, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE trucks SET brand = ?, truck_load = ?, capacity = ?, year = ?, repairs = ? WHERE id = ?',
                [brand, load, capacity, year, repairs, truckID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const truckID = 1;
        const brand = 1;
        const load = 1000;
        const capacity = 2000;
        const year = '2020';
        const repairs = 0;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.updateTruck(truckID, brand, load, capacity, year, repairs, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE trucks SET brand = ?, truck_load = ?, capacity = ?, year = ?, repairs = ? WHERE id = ?',
                [brand, load, capacity, year, repairs, truckID],
                expect.any(Function)
            );
            done();
        });
    });
});


// DELETE TRUCK
describe('Transporter.deleteTruck', () => {
    it('should delete a truck and return the result', (done) => {
        const truckID = 1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.deleteTruck(truckID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'DELETE from trucks WHERE id = ?',
                truckID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const truckID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.deleteTruck(truckID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'DELETE from trucks WHERE id = ?',
                truckID,
                expect.any(Function)
            );
            done();
        });
    });
});

/********************************************EMPLOYEE TESTS*******************************************/
// CREATE EMPLOYEE
describe('Transporter.createEmployee', () => {
    it('should insert an employee and return the result', (done) => {
        const name = 'John';
        const surname = 'Doe';
        const seniority = 1;
        const mockResult = { insertId: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.createEmployee(name, surname, seniority, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO employees (name, surname, seniority) VALUES (?, ?, ?)',
                [name, surname, seniority],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const name = 'John';
        const surname = 'Doe';
        const seniority = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.createEmployee(name, surname, seniority, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO employees (name, surname, seniority) VALUES (?, ?, ?)',
                [name, surname, seniority],
                expect.any(Function)
            );
            done();
        });
    });
});

// RETRIEVE EMPLOYEES
describe('Transporter.getEmployees', () => {
    it('should retrieve all employees with dereference', (done) => {
        const mockEmployees = [
            { id: 1, name: 'John', surname: 'Doe', seniority: 'Senior' },
            { id: 2, name: 'Jane', surname: 'Smith', seniority: 'Junior' },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockEmployees);
        });

        Transporter.getEmployees(true, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockEmployees);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT e.id, e.name, e.surname, s.seniority FROM employees e JOIN seniorities s ON e.seniority = s.id',
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve all employees without dereference', (done) => {
        const mockEmployees = [
            { id: 1, name: 'John', surname: 'Doe', seniority: 1 },
            { id: 2, name: 'Jane', surname: 'Smith', seniority: 2 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockEmployees);
        });

        Transporter.getEmployees(false, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockEmployees);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM employees',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getEmployees(true, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT e.id, e.name, e.surname, s.seniority FROM employees e JOIN seniorities s ON e.seniority = s.id',
                expect.any(Function)
            );
            done();
        });
    });
});


describe('Transporter.getEmployee', () => {
    it('should retrieve a single employee by ID with dereference', (done) => {
        const employeeID = 1;
        const mockEmployee = [
            { id: 1, name: 'John', surname: 'Doe', seniority: 'Senior' },
        ];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockEmployee);
        });

        Transporter.getEmployee(employeeID, true, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockEmployee);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT e.id, e.name, e.surname, s.seniority FROM employees e JOIN seniorities s ON e.seniority = s.id WHERE e.id = ?',
                employeeID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve a single employee by ID without dereference', (done) => {
        const employeeID = 1;
        const mockEmployee = [
            { id: 1, name: 'John', surname: 'Doe', seniority: 1 },
        ];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockEmployee);
        });

        Transporter.getEmployee(employeeID, false, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockEmployee);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM employees WHERE id = ?',
                employeeID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const employeeID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getEmployee(employeeID, true, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT e.id, e.name, e.surname, s.seniority FROM employees e JOIN seniorities s ON e.seniority = s.id WHERE e.id = ?',
                employeeID,
                expect.any(Function)
            );
            done();
        });
    });
});

// UPDATE EMPLOYEE
describe('Transporter.updateEmployee', () => {
    it('should update an employee and return the result', (done) => {
        const employeeID = 1;
        const name = 'John';
        const surname = 'Doe';
        const seniority = 1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.updateEmployee(employeeID, name, surname, seniority, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE employees SET name = ?, surname = ?, seniority = ? WHERE id = ?',
                [name, surname, seniority, employeeID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const employeeID = 1;
        const name = 'John';
        const surname = 'Doe';
        const seniority = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.updateEmployee(employeeID, name, surname, seniority, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE employees SET name = ?, surname = ?, seniority = ? WHERE id = ?',
                [name, surname, seniority, employeeID],
                expect.any(Function)
            );
            done();
        });
    });
});


// DELETE EMPLOYEE
describe('Transporter.deleteEmployee', () => {
    it('should delete an employee and return the result', (done) => {
        const employeeID = 1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.deleteEmployee(employeeID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM employees WHERE id = ?',
                employeeID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const employeeID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.deleteEmployee(employeeID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM employees WHERE id = ?',
                employeeID,
                expect.any(Function)
            );
            done();
        });
    });
});

/********************************************DRIVER TESTS*******************************************/
// CREATE DRIVER
describe('Transporter.createDriver', () => {
    it('should insert a driver and return the result', (done) => {
        const employeeID = 1;
        const category = 2;
        const mockResult = { insertId: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.createDriver(employeeID, category, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO drivers (employee_id, category) VALUES (?, ?)',
                [employeeID, category],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const employeeID = 1;
        const category = 2;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.createDriver(employeeID, category, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO drivers (employee_id, category) VALUES (?, ?)',
                [employeeID, category],
                expect.any(Function)
            );
            done();
        });
    });
});

// RETRIEVE DRIVERS
describe('Transporter.getDriverCategories', () => {
    it('should retrieve all driver categories', (done) => {
        const mockCategories = [
            { id: 1, category: 'Category 1' },
            { id: 2, category: 'Category 2' },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockCategories);
        });

        Transporter.getDriverCategories((err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockCategories);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * from categories',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getDriverCategories((err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * from categories',
                expect.any(Function)
            );
            done();
        });
    });
});

describe('Transporter.getDriver', () => {
    it('should retrieve a single driver by ID with dereference', (done) => {
        const driverID = 1;
        const mockDriver = [
            { id: 1, name: 'John', surname: 'Doe', category: 'Category 1' },
        ];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockDriver);
        });

        Transporter.getDriver(driverID, true, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockDriver);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT d.id, e.name, e.surname, d.category FROM employees e JOIN drivers d ON e.id = d.employee_id WHERE d.id = ? ',
                driverID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve a single driver by ID without dereference', (done) => {
        const driverID = 1;
        const mockDriver = [
            { id: 1, employee_id: 1, category: 1 },
        ];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockDriver);
        });

        Transporter.getDriver(driverID, false, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockDriver);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM drivers WHERE id = ?',
                driverID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const driverID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getDriver(driverID, true, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT d.id, e.name, e.surname, d.category FROM employees e JOIN drivers d ON e.id = d.employee_id WHERE d.id = ? ',
                driverID,
                expect.any(Function)
            );
            done();
        });
    });
});

describe('Transporter.getDrivers', () => {
    it('should retrieve all drivers with dereference', (done) => {
        const mockDrivers = [
            { id: 1, name: 'John', surname: 'Doe', category_id: 1, category: 'Category 1' },
            { id: 2, name: 'Jane', surname: 'Smith', category_id: 2, category: 'Category 2' },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockDrivers);
        });

        Transporter.getDrivers(true, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockDrivers);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT d.id, e.name, e.surname, d.category AS category_id, c.category FROM employees e JOIN drivers d ON e.id = d.employee_id JOIN categories c on d.category = c.id',
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve all drivers without dereference', (done) => {
        const mockDrivers = [
            { id: 1, employee_id: 1, category: 1 },
            { id: 2, employee_id: 2, category: 2 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockDrivers);
        });

        Transporter.getDrivers(false, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockDrivers);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM drivers',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getDrivers(true, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT d.id, e.name, e.surname, d.category AS category_id, c.category FROM employees e JOIN drivers d ON e.id = d.employee_id JOIN categories c on d.category = c.id',
                expect.any(Function)
            );
            done();
        });
    });
});

// UPDATE DRIVER
describe('Transporter.updateDriver', () => {
    it('should update a driver and return the result', (done) => {
        const driverID = 1;
        const category = 2;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.updateDriver(driverID, category, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE drivers SET category = ? WHERE id = ?',
                [category, driverID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const driverID = 1;
        const category = 2;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.updateDriver(driverID, category, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE drivers SET category = ? WHERE id = ?',
                [category, driverID],
                expect.any(Function)
            );
            done();
        });
    });
});


// DELETE DRIVER
describe('Transporter.deleteDriver', () => {
    it('should delete a driver and return the result', (done) => {
        const driverID = 1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.deleteDriver(driverID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM drivers WHERE id = ?',
                driverID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const driverID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.deleteDriver(driverID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM drivers WHERE id = ?',
                driverID,
                expect.any(Function)
            );
            done();
        });
    });
});

/********************************************MECHANIC TESTS*******************************************/
// CREATE MECHANIC
describe('Transporter.createMechanic', () => {
    it('should insert a mechanic and return the result', (done) => {
        const employeeID = 1;
        const specializedBrand = 2;
        const mockResult = { insertId: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.createMechanic(employeeID, specializedBrand, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO mechanics (employee_id, brand_specialized) VALUES (?, ?)',
                [employeeID, specializedBrand],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const employeeID = 1;
        const specializedBrand = 2;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.createMechanic(employeeID, specializedBrand, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO mechanics (employee_id, brand_specialized) VALUES (?, ?)',
                [employeeID, specializedBrand],
                expect.any(Function)
            );
            done();
        });
    });
});

// RETRIEVE MECHANICS
describe('Transporter.getMechanic', () => {
    it('should retrieve a single mechanic by ID with dereference', (done) => {
        const mechanicID = 1;
        const mockMechanic = [
            { id: 1, name: 'John', surname: 'Doe', specialized_brand: 'Brand 1' },
        ];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockMechanic);
        });

        Transporter.getMechanic(mechanicID, true, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockMechanic);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT m.id, e.name, e.surname, m.specialized_brand FROM employees e JOIN mechanics m ON e.id = m.employee_id WHERE m.id = ? ',
                mechanicID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve a single mechanic by ID without dereference', (done) => {
        const mechanicID = 1;
        const mockMechanic = [
            { id: 1, employee_id: 1, brand_specialized: 1 },
        ];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockMechanic);
        });

        Transporter.getMechanic(mechanicID, false, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockMechanic);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM mechanics WHERE id = ?',
                mechanicID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mechanicID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getMechanic(mechanicID, true, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT m.id, e.name, e.surname, m.specialized_brand FROM employees e JOIN mechanics m ON e.id = m.employee_id WHERE m.id = ? ',
                mechanicID,
                expect.any(Function)
            );
            done();
        });
    });
});

describe('Transporter.getMechanics', () => {
    it('should retrieve all mechanics with dereference', (done) => {
        const mockMechanics = [
            { id: 1, name: 'John', surname: 'Doe', mechanic_id: 1, brand: 'Brand 1' },
            { id: 2, name: 'Jane', surname: 'Smith', mechanic_id: 2, brand: 'Brand 2' },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockMechanics);
        });

        Transporter.getMechanics(true, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockMechanics);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT m.id, e.name, e.surname, m.id AS mechanic_id, b.name AS brand FROM employees e JOIN mechanics m ON e.id = m.employee_id JOIN brands b on m.brand_specialized = b.id',
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve all mechanics without dereference', (done) => {
        const mockMechanics = [
            { id: 1, employee_id: 1, brand_specialized: 1 },
            { id: 2, employee_id: 2, brand_specialized: 2 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockMechanics);
        });

        Transporter.getMechanics(false, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockMechanics);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM mechanics',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getMechanics(true, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT m.id, e.name, e.surname, m.id AS mechanic_id, b.name AS brand FROM employees e JOIN mechanics m ON e.id = m.employee_id JOIN brands b on m.brand_specialized = b.id',
                expect.any(Function)
            );
            done();
        });
    });
});

// UPDATE MECHANIC
describe('Transporter.updateMechanic', () => {
    it('should update a mechanic and return the result', (done) => {
        const mechanicID = 1;
        const specializedBrand = 2;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.updateMechanic(mechanicID, specializedBrand, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE mechanics SET brand_specialized = ? WHERE id = ?',
                [specializedBrand, mechanicID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mechanicID = 1;
        const specializedBrand = 2;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.updateMechanic(mechanicID, specializedBrand, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE mechanics SET brand_specialized = ? WHERE id = ?',
                [specializedBrand, mechanicID],
                expect.any(Function)
            );
            done();
        });
    });
});

// DELETE MECHANIC
describe('Transporter.deleteMechanic', () => {
    it('should delete a mechanic and return the result', (done) => {
        const mechanicID = 1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.deleteMechanic(mechanicID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM mechanics WHERE id = ?',
                mechanicID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mechanicID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.deleteMechanic(mechanicID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM mechanics WHERE id = ?',
                mechanicID,
                expect.any(Function)
            );
            done();
        });
    });
});

/********************************************CUSTOMER TESTS*******************************************/
// CREATE CUSTOMER
describe('Transporter.createCustomer', () => {
    it('should insert a customer and return the result', (done) => {
        const name = 'John';
        const surname = 'Doe';
        const address = '123 Fake St';
        const phone1 = '123456789';
        const phone2 = '987654321';
        const mockResult = { insertId: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.createCustomer(name, surname, address, phone1, phone2, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO customers (name, surname, address, phone1, phone2) VALUES (?, ?, ?, ?, ?)',
                [name, surname, address, phone1, phone2],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const name = 'John';
        const surname = 'Doe';
        const address = '123 Fake St';
        const phone1 = '123456789';
        const phone2 = '987654321';
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.createCustomer(name, surname, address, phone1, phone2, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO customers (name, surname, address, phone1, phone2) VALUES (?, ?, ?, ?, ?)',
                [name, surname, address, phone1, phone2],
                expect.any(Function)
            );
            done();
        });
    });
})

// RETRIEVE CUSTOMERS
describe('Transporter.getCustomers', () => {
    it('should retrieve all customers', (done) => {
        const mockCustomers = [
            { id: 1, name: 'John', surname: 'Doe', address: '123 Fake St', phone1: '123456789', phone2: '987654321' },
            { id: 2, name: 'Jane', surname: 'Smith', address: '456 Real St', phone1: '987654321', phone2: '123456789' },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockCustomers);
        });

        Transporter.getCustomers((err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockCustomers);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM customers',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getCustomers((err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM customers',
                expect.any(Function)
            );
            done();
        });
    });
});

// UPDATE CUSTOMER
describe('Transporter.updateCustomer', () => {
    it('should update a customer and return the result', (done) => {
        const customerID = 1;
        const name = 'John';
        const surname = 'Doe';
        const address = '123 Fake St';
        const phone1 = '123456789';
        const phone2 = '987654321';
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.updateCustomer(customerID, name, surname, address, phone1, phone2, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE customers SET name = ?, surname = ?, address = ?, phone1 = ?, phone2 = ? WHERE id = ?',
                [name, surname, address, phone1, phone2, customerID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const customerID = 1;
        const name = 'John';
        const surname = 'Doe';
        const address = '123 Fake St';
        const phone1 = '123456789';
        const phone2 = '987654321';
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.updateCustomer(customerID, name, surname, address, phone1, phone2, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE customers SET name = ?, surname = ?, address = ?, phone1 = ?, phone2 = ? WHERE id = ?',
                [name, surname, address, phone1, phone2, customerID],
                expect.any(Function)
            );
            done();
        });
    });
});

// DELETE CUSTOMER
describe('Transporter.deleteCustomer', () => {
    it('should delete a customer and return the result', (done) => {
        const customerID = 1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.deleteCustomer(customerID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM customers WHERE id = ?',
                customerID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const customerID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.deleteCustomer(customerID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM customers WHERE id = ?',
                customerID,
                expect.any(Function)
            );
            done();
        });
    });
});

/********************************************SHIPMENT TESTS*******************************************/
// CREATE SHIPMENT
describe('Transporter.createShipment', () => {
    it('should insert a shipment and return the result', (done) => {
        const customerID = 1;
        const weight = 22;
        const value = 30000;
        const name = 'Electronics Parts';
        const mockResult = { insertId: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.createShipment(name, weight, value, customerID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO shipments (name, weight, value, customer_id) VALUES (?, ?, ?, ?)',
                [name, weight, value, customerID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const customerID = 1;
        const weight = 22;
        const value = 30000;
        const name = 'Electronics Parts';
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.createShipment(name, weight, value, customerID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO shipments (name, weight, value, customer_id) VALUES (?, ?, ?, ?)',
                [name, weight, value, customerID],
                expect.any(Function)
            );
            done();
        });
    });
})

// RETRIEVE SHIPMENTS
describe('Transporter.getShipments', () => {
    it('should retrieve all shipments with dereference', (done) => {
        const mockShipments = [
            { id: 1, name: 'Electronics Parts', weight: 22, value: 30000, customer_id: 1 },
            { id: 2, name: 'Furniture', weight: 50, value: 50000, customer_id: 2 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockShipments);
        });

        Transporter.getShipments(true, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockShipments);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT s.id, s.name, s.weight, s.value, c.name AS customer_name, c.surname AS customer_surname, c.address FROM shipments s JOIN customers c ON s.customer_id = c.id',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getShipments(true, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT s.id, s.name, s.weight, s.value, c.name AS customer_name, c.surname AS customer_surname, c.address FROM shipments s JOIN customers c ON s.customer_id = c.id',
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve all shipments without dereference', (done) => {
        const mockShipments = [
            { id: 1, name: 'Electronics Parts', weight: 22, value: 30000, customer_id: 1 },
            { id: 2, name: 'Furniture', weight: 50, value: 50000, customer_id: 2 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockShipments);
        });

        Transporter.getShipments(false, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockShipments);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM shipments',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getShipments(false, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM shipments',
                expect.any(Function)
            );
            done();
        });
    });
});

describe('Transporter.getShipment', () => {
    it('should retrieve a single shipments with dereference', (done) => {
        const shipmentID = 1;
        const mockShipment = [{ id: 1, name: 'Electronics Parts', weight: 22, value: 30000, customer_id: 1 }];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockShipment);
        });

        Transporter.getShipment(shipmentID, true, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockShipment);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT s.id, s.name, s.customer_id, s.weight, s.value, c.name AS customer_name, c.surname AS customer_surname, c.address FROM shipments s JOIN customers c ON s.customer_id = c.id WHERE s.id = ?',
                shipmentID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve a single shipment without dereference', (done) => {
        const shipmentID = 1;
        const mockShipment = [{ id: 1, name: 'Electronics Parts', weight: 22, value: 30000, customer_id: 1 }];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockShipment);
        });

        Transporter.getShipment(shipmentID, false, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockShipment);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM shipments WHERE id = ?',
                shipmentID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const shipmentID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getShipment(shipmentID, true, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT s.id, s.name, s.customer_id, s.weight, s.value, c.name AS customer_name, c.surname AS customer_surname, c.address FROM shipments s JOIN customers c ON s.customer_id = c.id WHERE s.id = ?',
                shipmentID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const shipmentID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getShipment(shipmentID, false, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM shipments WHERE id = ?',
                shipmentID,
                expect.any(Function)
            );
            done();
        });
    });
});

// UPDATE SHIPMENT
describe('Transporter.updateShipment', () => {
    it('should update a shipment and return the result', (done) => {
        const shipmentID = 1;
        const name = 'Electronics Parts';
        const weight = 22;
        const value = 30000;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.updateShipment(shipmentID, name, weight, value, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE shipments SET name = ? , weight = ?, value = ? WHERE id = ?',
                [name, weight, value, shipmentID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const shipmentID = 1;
        const name = 'Electronics Parts';
        const weight = 22;
        const value = 30000;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.updateShipment(shipmentID, name, weight, value, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE shipments SET name = ? , weight = ?, value = ? WHERE id = ?',
                [name, weight, value, shipmentID],
                expect.any(Function)
            );
            done();
        });
    });
});

/********************************************TRIP TESTS*******************************************/
// CREATE TRIP
describe('Transporter.createTrip', () => {
    it('should insert a trip and return result', (done) => {
        const routeFrom = "Shelbyville";
        const routeTo = "Springfield";
        const driver1ID = 672;
        const driver2ID = -1;
        const mockTrip = [{ insertId: 1 }];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockTrip);
        });

        Transporter.createTrip(routeFrom, routeTo, driver1ID, driver2ID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockTrip);
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO trips (route_from, route_to, driver1_id, driver2_id) VALUES (?, ?, ?, ?)',
                [routeFrom, routeTo, driver1ID, driver2ID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const routeFrom = "Shelbyville";
        const routeTo = "Springfield";
        const driver1ID = 672;
        const driver2ID = -1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.createTrip(routeFrom, routeTo, driver1ID, driver2ID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO trips (route_from, route_to, driver1_id, driver2_id) VALUES (?, ?, ?, ?)',
                [routeFrom, routeTo, driver1ID, driver2ID],
                expect.any(Function)
            );
            done();
        });
    });
});

// RETRIEVE TRIPS
describe('Transporter.getTrips', () => {
    it('should retrieve all trips with dereference', (done) => {
        const mockTrips = [
            { id: 1, route_from: 'Shelbyville', route_to: 'Springfield', driver1_id: 672, driver2_id: -1 },
            { id: 2, route_from: 'Springfield', route_to: 'Shelbyville', driver1_id: 672, driver2_id: -1 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockTrips);
        });

        Transporter.getTrips(true, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockTrips);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT t.id, t.route_from, t.route_to, d1.name as driver1, d2.name as driver2 FROM trips t JOIN drivers d1 ON t.driver1_id = d1.id LEFT JOIN drivers d2 ON t.driver2_id = d2.id',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getTrips(true, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT t.id, t.route_from, t.route_to, d1.name as driver1, d2.name as driver2 FROM trips t JOIN drivers d1 ON t.driver1_id = d1.id LEFT JOIN drivers d2 ON t.driver2_id = d2.id',
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve all trips without dereference', (done) => {
        const mockTrips = [
            { id: 1, route_from: 'Shelbyville', route_to: 'Springfield', driver1_id: 672, driver2_id: -1 },
            { id: 2, route_from: 'Springfield', route_to: 'Shelbyville', driver1_id: 672, driver2_id: -1 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockTrips);
        });

        Transporter.getTrips(false, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockTrips);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM trips',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getTrips(false, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM trips',
                expect.any(Function)
            );
            done();
        });
    });
});

describe('Transporter.getTrip', () => {
    it('should retrieve a single trip with dereference', (done) => {
        const tripID = 1;
        const mockTrip = [{ id: 1, route_from: 'Shelbyville', route_to: 'Springfield', driver1_id: 672, driver2_id: -1 }];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockTrip);
        });

        Transporter.getTrip(tripID, true, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockTrip);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT t.id, t.route_from, t.route_to, d1.name as driver1, d2.name as driver2 FROM trips t JOIN drivers d1 ON t.driver1_id = d1.id LEFT JOIN drivers d2 ON t.driver2_id = d2.id WHERE id = ?',
                tripID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const tripID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getTrip(tripID, true, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT t.id, t.route_from, t.route_to, d1.name as driver1, d2.name as driver2 FROM trips t JOIN drivers d1 ON t.driver1_id = d1.id LEFT JOIN drivers d2 ON t.driver2_id = d2.id WHERE id = ?',
                tripID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve a single trip without dereference', (done) => {
        const tripID = 1;
        const mockTrip = [{ id: 1, route_from: 'Shelbyville', route_to: 'Springfield', driver1_id: 672, driver2_id: -1 }];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockTrip);
        });

        Transporter.getTrip(tripID, false, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockTrip);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM trips',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const tripID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getTrip(tripID, false, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM trips',
                expect.any(Function)
            );
            done();
        });
    });
});

// UPDATE TRIP
describe('Transporter.updateTrip', () => {
    it('should update a trip and return the result', (done) => {
        const tripID = 1;
        const routeFrom = "Shelbyville";
        const routeTo = "Springfield";
        const driver1ID = 672;
        const driver2ID = -1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.updateTrip(tripID, routeFrom, routeTo, driver1ID, driver2ID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE trips SET route_from = ?, route_to = ?, driver1_id = ?, driver2_id = ? WHERE id = ?',
                [routeFrom, routeTo, driver1ID, driver2ID, tripID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const tripID = 1;
        const routeFrom = "Shelbyville";
        const routeTo = "Springfield";
        const driver1ID = 672;
        const driver2ID = -1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.updateTrip(tripID, routeFrom, routeTo, driver1ID, driver2ID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE trips SET route_from = ?, route_to = ?, driver1_id = ?, driver2_id = ? WHERE id = ?',
                [routeFrom, routeTo, driver1ID, driver2ID, tripID],
                expect.any(Function)
            );
            done();
        });
    });
});

// DELETE TRIP
describe('Transporter.deleteTrip', () => {
    it('should delete a trip and return the result', (done) => {
        const tripID = 1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.deleteTrip(tripID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM trips WHERE id = ?',
                tripID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const tripID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.deleteTrip(tripID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM trips WHERE id = ?',
                tripID,
                expect.any(Function)
            );
            done();
        });
    });
});

/********************************************REPAIR TESTS*******************************************/
// CREATE REPAIR
describe('Transporter.createRepair', () => {
    it('should insert a repair and return result', (done) => {
        const truckID = 1;
        const mechanicID = 1;
        const estimatedTime = 12;
        const mockTrip = [{ insertId: 1 }];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockTrip);
        });

        Transporter.createRepair(truckID, mechanicID, estimatedTime, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockTrip);
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO repairs (truck_id, mechanic_id, estimated_time) VALUES (?, ?, ?)',
                [truckID, mechanicID, estimatedTime],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const truckID = 1;
        const mechanicID = 1;
        const estimatedTime = 12;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.createRepair(truckID, mechanicID, estimatedTime, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO repairs (truck_id, mechanic_id, estimated_time) VALUES (?, ?, ?)',
                [truckID, mechanicID, estimatedTime],
                expect.any(Function)
            );
            done();
        });
    });
});

// RETRIEVE REPAIRS
describe('Transporter.getRepairs', () => {
    it('should retrieve all repairs with dereference', (done) => {
        const mockRepairs = [
            { id: 1, truck_id: 1, mechanic_id: 1, estimated_time: 12 },
            { id: 2, truck_id: 2, mechanic_id: 2, estimated_time: 24 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockRepairs);
        });

        Transporter.getRepairs(true, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockRepairs);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT r.id, t.brand, e.name, e.surname, r.estimated_time FROM repairs r JOIN trucks t ON r.truck_id = t.id JOIN mechanics m ON r.mechanic_id = m.id JOIN employees e ON m.employee_id = e.id',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getRepairs(true, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT r.id, t.brand, e.name, e.surname, r.estimated_time FROM repairs r JOIN trucks t ON r.truck_id = t.id JOIN mechanics m ON r.mechanic_id = m.id JOIN employees e ON m.employee_id = e.id',
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve all repairs without dereference', (done) => {
        const mockRepairs = [
            { id: 1, truck_id: 1, mechanic_id: 1, estimated_time: 12 },
            { id: 2, truck_id: 2, mechanic_id: 2, estimated_time: 24 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockRepairs);
        });

        Transporter.getRepairs(false, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockRepairs);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT r.id, t.brand, e.name, e.surname, r.estimated_time FROM repairs r JOIN trucks t ON r.truck_id = t.id JOIN mechanics m ON r.mechanic_id = m.id JOIN employees e ON m.employee_id = e.id',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getRepairs(false, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT r.id, t.brand, e.name, e.surname, r.estimated_time FROM repairs r JOIN trucks t ON r.truck_id = t.id JOIN mechanics m ON r.mechanic_id = m.id JOIN employees e ON m.employee_id = e.id',
                expect.any(Function)
            );
            done();
        });
    });
});

describe('Transporter.getRepair', () => {
    it('should retrieve a single repair with dereference', (done) => {
        const repairID = 1;
        const mockRepairs = [
            { id: 1, truck_id: 1, mechanic_id: 1, estimated_time: 12 },
            { id: 2, truck_id: 2, mechanic_id: 2, estimated_time: 24 },
        ];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockRepairs);
        });

        Transporter.getRepair(repairID, true, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockRepairs);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT r.id, t.brand, e.name, e.surname, r.estimated_time FROM repairs r JOIN trucks t ON r.truck_id = t.id JOIN mechanics m ON r.mechanic_id = m.id JOIN employees e ON m.employee_id = e.id WHERE id = ?',
                repairID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const repairID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getRepair(repairID, true, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT r.id, t.brand, e.name, e.surname, r.estimated_time FROM repairs r JOIN trucks t ON r.truck_id = t.id JOIN mechanics m ON r.mechanic_id = m.id JOIN employees e ON m.employee_id = e.id WHERE id = ?',
                repairID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should retrieve a single repair without dereference', (done) => {
        const repairID = 1;
        const mockRepairs = [
            { id: 1, truck_id: 1, mechanic_id: 1, estimated_time: 12 },
            { id: 2, truck_id: 2, mechanic_id: 2, estimated_time: 24 },
        ];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockRepairs);
        });

        Transporter.getRepair(repairID, false, (err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockRepairs);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT r.id, t.brand, e.name, e.surname, r.estimated_time FROM repairs r JOIN trucks t ON r.truck_id = t.id JOIN mechanics m ON r.mechanic_id = m.id JOIN employees e ON m.employee_id = e.id WHERE id = ?',
                repairID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const repairID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getRepair(repairID, false, (err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT r.id, t.brand, e.name, e.surname, r.estimated_time FROM repairs r JOIN trucks t ON r.truck_id = t.id JOIN mechanics m ON r.mechanic_id = m.id JOIN employees e ON m.employee_id = e.id WHERE id = ?',
                repairID,
                expect.any(Function)
            );
            done();
        });
    });
});

// UPDATE REPAIR
describe('Transporter.updateRepair', () => {
    it('should update a repair and return result', (done) => {
        const repairID = 1;
        const truckID = 1;
        const mechanicID = 1;
        const estimatedTime = 12;
        const mockTrip = [{ affectedRows: 1 }];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockTrip);
        });

        Transporter.updateRepair(repairID, truckID, mechanicID, estimatedTime, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toBe(mockTrip);
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE repairs SET truck_id = ?, mechanic_id = ?, estimated_time = ? WHERE id = ?',
                [truckID, mechanicID, estimatedTime, repairID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const repairID = 1;
        const truckID = 1;
        const mechanicID = 1;
        const estimatedTime = 12;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.updateRepair(repairID, truckID, mechanicID, estimatedTime, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE repairs SET truck_id = ?, mechanic_id = ?, estimated_time = ? WHERE id = ?',
                [truckID, mechanicID, estimatedTime, repairID],
                expect.any(Function)
            );
            done();
        });
    });
});

// DELETE REPAIR
describe('Transporter.deleteRepair', () => {
    it('should delete a repair and return the result', (done) => {
        const repairID = 1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.deleteRepair(repairID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM repairs WHERE id = ?',
                repairID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const repairID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.deleteRepair(repairID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM repairs WHERE id = ?',
                repairID,
                expect.any(Function)
            );
            done();
        });
    });
});

/********************************************SHIPMENT TRIP TESTS*******************************************/
// CREATE SHIPMENT TRIP
describe('Transporter.createTripShipment', () => {
    it('should insert a trip_shipment and return the result', (done) => {
        const tripID = 1;
        const shipmentID = 2;
        const mockResult = { insertId: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.createTripShipment(tripID, shipmentID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO trip_shipments (trip_id, shipment_id) VALUES (?, ?)',
                [tripID, shipmentID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const tripID = 1;
        const shipmentID = 2;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.createTripShipment(tripID, shipmentID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'INSERT INTO trip_shipments (trip_id, shipment_id) VALUES (?, ?)',
                [tripID, shipmentID],
                expect.any(Function)
            );
            done();
        });
    });
});

// RETRIEVE TRIP SHIPMENT
describe('Transporter.getTripShipment', () => {
    it('should retrieve a single trip shipment by ID', (done) => {
        const tripShipmentID = 1;
        const mockTripShipment = [
            { id: 1, shipment_id: 121, trip_id: 12 },
        ];

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockTripShipment);
        });

        Transporter.getTripShipment(tripShipmentID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockTripShipment);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM trip_shipments WHERE id = ?',
                tripShipmentID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const tripShipmentID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.getTripShipment(tripShipmentID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM trip_shipments WHERE id = ?',
                tripShipmentID,
                expect.any(Function)
            );
            done();
        });
    });
});

describe('Transporter.getTripShipments', () => {
    it('should retrieve all trip_shipments', (done) => {
        const mockTripShipments = [
            { id: 1, shipment_id: 121, trip_id: 12 },
            { id: 3, shipment_id: 221, trip_id: 13 },
        ];

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockTripShipments);
        });

        Transporter.getTripShipments((err: MysqlError | null, results: any) => {
            expect(err).toBeNull();
            expect(results).toEqual(mockTripShipments);
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM trip_shipments',
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        Transporter.getTripShipments((err: MysqlError | null, results: any) => {
            expect(err).toBe(mockError);
            expect(results).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'SELECT * FROM trip_shipments',
                expect.any(Function)
            );
            done();
        });
    });
});

// UPDATE TRIP SHIPMENT
describe('Transporter.updateTripShipment', () => {
    it('should update a trip shipment and return the result', (done) => {
        const tripShipmentID = 1;
        const tripID = 1;
        const shipmentID = 2;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.updateTripShipment(tripShipmentID, tripID, shipmentID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE trip_shipments SET trip_id = ?, shipment_id = ? WHERE id = ?',
                [tripID, shipmentID, tripShipmentID],
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const tripShipmentID = 1;
        const tripID = 1;
        const shipmentID = 2;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.updateTripShipment(tripShipmentID, tripID, shipmentID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'UPDATE trip_shipments SET trip_id = ?, shipment_id = ? WHERE id = ?',
                [tripID, shipmentID, tripShipmentID],
                expect.any(Function)
            );
            done();
        });
    });
});

// DELETE TRIP SHIPMENT
describe('Transporter.deleteTripShipment', () => {
    it('should delete a trip shipment and return the result', (done) => {
        const trShipmentID = 1;
        const mockResult = { affectedRows: 1 };

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(null, mockResult);
        });

        Transporter.deleteTripShipment(trShipmentID, (err: MysqlError | null, result: any) => {
            expect(err).toBeNull();
            expect(result).toEqual(mockResult);
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM trip_shipments WHERE id = ?',
                trShipmentID,
                expect.any(Function)
            );
            done();
        });
    });

    it('should return an error when the query fails', (done) => {
        const trShipmentID = 1;
        const mockError = new Error('Test Error');

        (con.query as jest.Mock).mockImplementation((query, values, callback) => {
            callback(mockError, null);
        });

        Transporter.deleteTripShipment(trShipmentID, (err: MysqlError | null, result: any) => {
            expect(err).toBe(mockError);
            expect(result).toBeNull();
            expect(con.query).toHaveBeenCalledWith(
                'DELETE FROM trip_shipments WHERE id = ?',
                trShipmentID,
                expect.any(Function)
            );
            done();
        });
    });
});
