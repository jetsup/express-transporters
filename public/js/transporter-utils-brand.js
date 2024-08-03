async function populateTrucks() {
    const apiUrl = "/api/brands";

    const table = document.querySelector("#brand-table");
    const dataTable = new DataTable(table, {
        responsive: true,
        ajax: {
            url: apiUrl,
            dataSrc: "",
        },
        columns: [
            // { data: "id" },
            { data: "name" },
            {
                data: null, // Use null data to indicate that this column will use custom rendering
                render: function (data, type, row) {
                    return `<form action="/brand/delete/${row.id}" method="post"><button type="submit" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</button></form>`;
                },
                orderable: false, // Disable ordering for the actions column
            },
        ],
    });
}

export default populateTrucks;
