export async function populateCustomers() {
    const apiUrl = "/api/customer";

    const table = document.querySelector("#customer-table");
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
                    return `<a href="/customer/view/${row.id}">${row.name}</a>`;
                },
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<a href="/customer/view/${row.id}">${row.surname}</a>`;
                },
            },
            { data: "address" },
            { data: "phone1" },
            { data: "phone2" },
            {
                data: null,
                render: function (data, type, row) {
                    return `<form action="/customer/delete/${row.id}" method="post"><button type="submit" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</button></form>`;
                },
                orderable: false,
            },
        ],
    });
}

export default populateCustomers;
