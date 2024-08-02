async function populateTrucks() {
    const apiUrl = "/api/trucks";

    const table = document.querySelector("#truck-table");
    const dataTable = new DataTable(table, {
        responsive: true,
        ajax: {
            url: apiUrl,
            dataSrc: "",
        },
        columns: [
            // { data: "id" },
            {
                data: null, //"brand"
                render:function (data, type, row) {
                    return `<a href="/truck/view/${row.id}">${row.brand}</a>`;
                },
            },
            { data: "truck_load" },
            { data: "capacity" },
            { data: "year" },
            { data: "repairs" },
            {
                data: null, // Use null data to indicate that this column will use custom rendering
                render: function (data, type, row) {
                    return `<form action="/truck/delete/${row.id}" method="post"><button type="submit" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</button></form>`;
                },
                orderable: false, // Disable ordering for the actions column
            },
        ],
    });
}

export default populateTrucks;
