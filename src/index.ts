import express from 'express';
import {
    homeRouter,
    brandCreateRouter,
    brandCreatePostRouter,
    // truck
    truckCreateRouter,
    truckEditRouter,
    truckUpdateRouter,
    trucksAPIRouter,
    truckDeleteRouter,
    truckCreatePostRouter,
    truckViewRouter,
    // employee
    employeeCreateRouter,
    employeeCreatePostRouter,
    employeeEditRouter,
    employeeUpdateRouter,
    employeeDeleteRouter,
    employeeViewRouter,
    employeesAPIRouter,
    // driver
    driverCreateRouter,
    driverCreatePostRouter,
    driverViewRouter,
    driverEditRouter,
    driverUpdateRouter,
    driverDeleteRouter,
    driverAPIRouter,
    // mechanic
    mechanicCreateRouter,
    mechanicCreatePostRouter,
    mechanicViewRouter,
    mechanicEditRouter,
    mechanicUpdateRouter,
    mechanicDeleteRouter,
    mechanicAPIRouter,
    // repair
    repairCreateRouter,
    repairViewRouter,
    // customer
    customerCreateRouter,
    customerCreatePostRouter,
    customerViewRouter,
    customerEditRouter,
    customerUpdateRouter,
    customerDeleteRouter,
    customerAPIRouter,
    // shipment
    shipmentCreateRouter,
    shipmentCreatePostRouter,
    shipmentViewRouter,
    shipmentEditRouter,
    shipmentUpdateRouter,
    shipmentDeleteRouter,
    shipmentAPIRouter,
    // trip
    tripCreateRouter,
    tripViewRouter,
    // shipment trip
} from '../routes/index';
import path from 'path';

const app = express();
const port = 3000;

// Configure pug as the engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../pages')); // Set the directory for your views

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRouter);
app.use('/', brandCreateRouter);
app.use('/', brandCreatePostRouter);

app.use('/', truckCreateRouter);
app.use('/', truckEditRouter);
app.use('/', truckUpdateRouter);
app.use('/', truckDeleteRouter);
app.use('/', truckCreatePostRouter);
app.use('/', truckViewRouter);
app.use('/', trucksAPIRouter);

app.use('/', employeeCreateRouter);
app.use('/', employeeCreatePostRouter);
app.use('/', employeeEditRouter);
app.use('/', employeeUpdateRouter);
app.use('/', employeeDeleteRouter);
app.use('/', employeeViewRouter);
app.use('/', employeesAPIRouter);

app.use('/', driverCreateRouter);
app.use('/', driverCreatePostRouter);
app.use('/', driverViewRouter);
app.use('/', driverEditRouter);
app.use('/', driverUpdateRouter);
app.use('/', driverDeleteRouter);
app.use('/', driverAPIRouter);

app.use('/', mechanicCreateRouter);
app.use('/', mechanicCreatePostRouter);
app.use('/', mechanicViewRouter);
app.use('/', mechanicEditRouter);
app.use('/', mechanicUpdateRouter);
app.use('/', mechanicDeleteRouter);
app.use('/', mechanicAPIRouter);

app.use('/', repairCreateRouter);
app.use('/', repairViewRouter);

app.use('/', customerCreateRouter);
app.use('/', customerCreatePostRouter);
app.use('/', customerViewRouter);
app.use('/', customerEditRouter);
app.use('/', customerUpdateRouter);
app.use('/', customerDeleteRouter);
app.use('/', customerAPIRouter);

app.use('/', shipmentCreateRouter);
app.use('/', shipmentViewRouter);
app.use('/', shipmentCreatePostRouter);
app.use('/', shipmentEditRouter);
app.use('/', shipmentUpdateRouter);
app.use('/', shipmentDeleteRouter);
app.use('/', shipmentAPIRouter);

app.use('/', tripCreateRouter);
app.use('/', tripViewRouter);

app.use('/', shipmentCreateRouter);
app.use('/', shipmentViewRouter);

// static files
// app.use(express.static(path.join(__dirname, '../../public')));
app.use("/js", express.static(__dirname + "../../public/js")); // redirect public js
app.use("/js", express.static(__dirname + "../../node_modules/bootstrap/dist/js")); // redirect bootstrap JS
app.use("/css", express.static(__dirname + "../../node_modules/bootstrap/dist/css")); // redirect CSS bootstrap
app.use("/js", express.static(__dirname + "../../node_modules/jquery/dist")); // redirect JS jQuery
app.use("/js", express.static(__dirname + "../../node_modules/datatables.net/js")); // redirect datatables js
app.use("/css", express.static(__dirname + "../../node_modules/datatables.net-dt/css")); // redirect datatables css


// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
