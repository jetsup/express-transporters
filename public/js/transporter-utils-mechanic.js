export async function populateMechanics() {
    const apiUrl = "/api/mechanic";

    const table = document.querySelector("#mechanic-table");
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
                    return `<a href="/mechanic/view/${row.id}">${row.name}</a>`;
                },
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<a href="/mechanic/view/${row.id}">${row.surname}</a>`;
                },
            },
            { data: "brand" },
            {
                data: null,
                render: function (data, type, row) {
                    return `<form action="/mechanic/delete/${row.id}" method="post"><button type="submit" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</button></form>`;
                },
                orderable: false,
            },
        ],
    });
}

export default populateMechanics;
