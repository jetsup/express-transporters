async function populateTrucks() {
    const apiUrl = "/api/cargos";

    const table = document.querySelector("#cargo-table");
    const dataTable = new DataTable(table, {
        responsive: true,
        ajax: {
            url: apiUrl,
            dataSrc: "",
        },
        columns: [
            // { data: "id" },
            { data: "package_name" },
            { data: "weight" },
            { data: "value" },
            { data: "route_from" },
            { data: "route_to" },
            { data: "name" },
            { data: "driver1_name" },
            { data: "driver2_name" },
            {
                data: null, // Use null data to indicate that this column will use custom rendering
                render: function (data, type, row) {
                    return `<form action="/cargo/delete/${row.id}" method="post"><button type="submit" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</button></form>`;
                },
                orderable: false, // Disable ordering for the actions column
            },
        ],
    });
}

export default populateTrucks;
