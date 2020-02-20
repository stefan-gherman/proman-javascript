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


$(document).ready(function () {
    $('#login').on('submit', function (event) {
        $.ajax({
            data: {
                username: $('#username-login').val(),
                password: $('#password-login').val()
            },
            type: 'POST',
            url: ('/login')
        }).done(function (data) {
            if (data.error) {
                $('#errorAlert-login').text(data.error).show();
                $('#successAlert-login').hide();
            } else {
                $('#successAlert-login').text(data.success).show();
                $('#errorAlert-login').hide();
            }

        });

        event.preventDefault();
    });
});