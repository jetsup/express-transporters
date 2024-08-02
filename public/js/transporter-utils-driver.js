export async function populateDrivers() {
    const apiUrl = "/api/driver";

    const table = document.querySelector("#driver-table");
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
                    return `<a href="/driver/view/${row.id}">${row.name}</a>`;
                },
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<a href="/driver/view/${row.id}">${row.surname}</a>`;
                },
            },
            { data: "category" },
            {
                data: null,
                render: function (data, type, row) {
                    return `<form action="/driver/delete/${row.id}" method="post"><button type="submit" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</button></form>`;
                },
                orderable: false,
            },
        ],
    });
}

export default populateDrivers;
