$(document).ready(function () {
    $('#register').on('submit', function (event) {
        $.ajax({
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            type: 'POST',
            url: ('/register')
        }).done(function (data) {

            if (data.error) {
                $('#errorAlert').text(data.error).show();
                $('#successAlert').hide();
            } else {
                $('#successAlert').text(data.success).show();
                $('#errorAlert').hide();
            }

        });

        event.preventDefault();
    });
});