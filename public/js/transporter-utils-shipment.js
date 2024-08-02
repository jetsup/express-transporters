export async function populateShipments() {
    const apiUrl = "/api/shipment";

    const table = document.querySelector("#shipment-table");
    const dataTable = new DataTable(table, {
        responsive: true,
        ajax: {
            url: apiUrl,
            dataSrc: "",
        },
        columns: [
            // { data: "id" },
            {
                data: null,
                render: function (data, type, row) {
                    return `<a href="/shipment/view/${row.id}">${row.name}</a>`;
                },
            },
            { data: "weight" },
            { data: "value" },
            {
                data: null,
                render: function (data, type, row) {
                    return `${row.customer_name} ${row.customer_surname}`;
                },
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<form action="/shipment/delete/${row.id}" method="post"><button type="submit" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</button></form>`;
                },
                orderable: false,
            },
        ],
    });
}

export default populateShipments;
