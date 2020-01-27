let email = $('#email'), password1 = $('#password'), password2 = $('#password2'), submit = $('#submitBtn');
$(document).ready(function () {
    if(email.val().length > 7 && password1.val().length > 7 && password2.val().length > 7) {
        $('#alert').text('¡Perfecto!');
        submit.prop('disabled', false);
    }
    else {
        $('#alert').text('El email y contraseña debe tener al menos 8 caracteres.');
        submit.prop('disabled', true);
    }
});

email.keyup(function () {
    if(email.val().length > 7 && password1.val().length > 7 && password2.val().length > 7) {
        $('#alert').text('¡Perfecto!');
        submit.prop('disabled', false);
    }
    else {
        $('#alert').text('El email y contraseña debe tener al menos 8 caracteres.');
        submit.prop('disabled', true);
    }
});
password1.keyup(function () {
    if(email.val().length > 7 && password1.val().length > 7 && password2.val().length > 7) {
        $('#alert').text('¡Perfecto!');
        submit.prop('disabled', false);
    }
    else {
        $('#alert').text('El email y contraseña debe tener al menos 8 caracteres.');
        submit.prop('disabled', true);
    }
});
password2.keyup(function () {
    if(email.val().length > 7 && password1.val().length > 7 && password2.val().length > 7) {
        if(password1.val() != password2.val()) {
            $('#alert').text('Las contraseñas no coinciden.');
            submit.prop('disabled', true);
        }
        else {
            $('#alert').text('¡Perfecto!');
            submit.prop('disabled', false);
        }   
    }
    else {
        $('#alert').text('El email y contraseña debe tener al menos 8 caracteres.');
        submit.prop('disabled', true);
    }
});