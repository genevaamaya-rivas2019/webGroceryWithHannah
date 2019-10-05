$(document).ready(function () {
    retrieveItems();

    function retrieveItems() {
        $.ajax({
            url: "item/retrieve/all",
            type: "GET",
            success: (data) => {
                $('tbody').empty();
                for (let i = 0; i < data.results.length; i++) {
                    addRow(data.results[i])

                }
            }
        })
    }

    function addRow(item) {
        var tr = $("<tr>")
        var btns = $("<div>").append($("<button>", {
            class: "btn btn-primary update btn-sm up",
            "data-toggle": "modal",
            "data-target": '#exampleModal',
            id: "update_" + item._id,
        }).text("update"),
            $("<button>", {
                class: "btn btn-danger del btn-sm",
                id: "delete_" + item._id,
            }).text("delete")
        )
        $(tr).append(
            $("<td>").text(item.name),
            $("<td>").text(item.quan),
            $("<td>").text(item.prio),
            $("<td>").append(btns)
        ).appendTo($('tbody'))
    }

    $(document).on("click", ".del", function () {
        $(this).parent().parent().parent().fadeOut("slow")
    })

    $("#btnAdd").click(function () {
        var validName = $('#name').val();
        var validNumber = $('#quantity').val()
        var validPrio = $('#priority').val()
        var valid = true;
        $('.form-control').each(function () {

         
            if (!$("#name").val()) {
                valid = false;
                Swal.fire({
                    type: 'error',
                    title: 'Name should be filled!!',
                    showConfirmButton: false,
                    timer: 1000
                })
            } else if (!$("#quantity").val()) {
                valid = false;
                Swal.fire({
                    type: 'error',
                    title: 'Quantity should be filled!!',
                    showConfirmButton: false,
                    timer: 1000
                })
            } else if (!$("#priority").val()) {
                valid = false;
                Swal.fire({
                    type: 'error',
                    title: 'Priority should be filled!!',
                    showConfirmButton: false,
                    timer: 1000
                })


            }
        })
        if (valid) {
            var formData = {
                name: $("#name").val(),
                quan: $("#quantity").val(),
                prio: $("#priority").val()
            }

            $.ajax({
                url: "/item/create",
                data: formData,
                success: function (result) {
                    Swal.fire({
                        type: 'success',
                        title: 'Add Success!',
                        text: 'Item has been added!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    addRow(formData)
                    $("#getResultDiv").html("<strong>Success!</strong>");
                    $('input').val("")
                },
                error: function (e) {
                    $("#getResultDiv").html("<strong>Error</strong>");
                    console.log("ERROR: ", e);
                }
            });

        }
    })


    $("#btnSearch").click(function (e) {
        var id = $('.id_search').val()
        retrieveItems(id)
    })

    $(document).on("click", ".del", function () {
        var formData = {
            name: $("#name").val(),
            quan: $("#quantity").val(),
            prio: $("#priority").val()
        }
        var id = $(this).attr('id').split('_')
        $.ajax({
            url: "/item/delete/" + id[1],
            data: formData,
            success: function (result) {
                console.log('Success!!')
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }
        });
    })

    $(document).on("click", ".update", function () {
        var id = $(this).attr('id').split('_')
        $('#btnUpdated').click(function () {
            var formData = {
                name: $("#updateName").val(),
                quan: $("#updateQuan").val(),
                prio: $("#updatePrio").val()
            }
            $.ajax({
                url: "/item/update/" + id[1],
                data: formData,
                success: function (result) {
                    retrieveItems();
                    console.log('Success!!')
                },
                error: function (e) {
                    console.log("ERROR: ", e);
                }
            });
        })
    })

})
