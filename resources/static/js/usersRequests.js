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
        var tr = $("<tr>", {
            id: item._id,
            name: item.item,
            quan: item.quantity,
            prio: item.priority
        });
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

    // $(document).on("click", ".update", function () {
    //     var id = $(this).attr('id').split('_')
    //     $('#btnUpdated').click(function () {
    //         var formData = {
    //             name: $("#updateName").val(),
    //             quan: $("#updateQuan").val(),
    //             prio: $("#updatePrio").val()
    //         }
    //         $.ajax({
    //             url: "/item/update/" + id[1],
    //             data: formData,
    //             success: function (result) {
    //                 retrieveItems();
    //                 console.log('Success!!')
    //                 $('input').val("");
    //             },
    //             error: function (e) {
    //                 console.log("ERROR: ", e);
    //             }
    //         });
    //     })
    // })
    var updateId;
    $(document).on("click", ".update", function () {
        status = false;
        retrieveOneItem($(this).parent().parent().parent().attr("id"));
        var id = $(this).attr('id').split('_')
        updateId = id[1];
        $("#modalUpdate").show();
        $("#tableItems").hide();
    })
    $(document).on("click", "#btnUpdated", function () {
        updateItem(updateId);
        retrieveItems();
        $("#modalUpdate").hide();
        $("#tableItems").show();
    })
    //update Item function
    function updateItem(id) {
        var name = $('input[name="updateName"]');
        var quan = $('input[name="updateQuantity"]');
        var prio = $('input[name="updatePriority"]');
        console.log(name+""+quan)
        $.ajax({
            url: "item/update/" + id + "",
            crossDomain: true,
            type: "put",
            data: {
                name: name.val(),
                quan: quan.val(),
                prio: prio.val(),
            },
            success: function (data) {
                console.log(data);
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

    function retrieveOneItem(id) {
        $.ajax({
            url: "item/retrieve/" + id + "",
            crossDomain: true,
            type: "GET",
            success: function (data) {
                $('#updateName').val(data.name);
                $('#updateQuan').val(data.quan);
                $('#updatePrio').val(data.prio);
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

})
