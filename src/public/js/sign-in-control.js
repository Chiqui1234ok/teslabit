let email = $('#email'), password = $('#password'), submit = $('#submitBtn');
$(document).ready(function () {
    if(email.val().length > 7 && password.val().length > 7)
        submit.prop('disabled', false);
    else
        submit.prop('disabled', true);
});

email.keyup(function () {
    if(email.val().length > 8 && password.val().length > 8) {
        submit.prop('disabled', false);
        $('#alert').text('¡Perfecto!');
    }
    else {
        $('#alert').text('El email y contraseña debe tener al menos 8 caracteres.');
        submit.prop('disabled', true);
    }
});
password.keyup(function () {
    if(email.val().length > 8 && password.val().length > 8) {
        submit.prop('disabled', false);
        $('#alert').text('¡Perfecto!');
    }
    else {
        $('#alert').text('El email y contraseña debe tener al menos 8 caracteres.');
        submit.prop('disabled', true);
    }
});