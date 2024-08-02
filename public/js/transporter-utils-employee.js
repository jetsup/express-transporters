export async function populateEmployees() {
    const apiUrl = "/api/employees";

    const table = document.querySelector("#employee-table");
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
                    return `<a href="/employee/view/${row.id}">${row.name}</a>`;
                },
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<a href="/employee/view/${row.id}">${row.surname}</a>`;
                },
            },
            { data: "seniority" },
            {
                data: null,
                render: function (data, type, row) {
                    return `<form action="/employee/delete/${row.id}" method="post"><button type="submit" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</button></form>`;
                },
                orderable: false,
            },
        ],
    });
}

export default populateEmployees;
