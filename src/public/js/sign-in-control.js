let email = $('#email'), password = $('#password'), submit = $('#submitBtn');
if(email.val().length > 9 && password.val().length > 7)
    submit.prop('disabled', false);
else
    submit.prop('disabled', true);

email.keyup(function () {
    if(email.val().length > 9 && password.val().length > 7)
        submit.prop('disabled', false);
    else
        submit.prop('disabled', true);
});
password.keyup(function () {
    if(email.val().length > 9 && password.val().length > 7)
        submit.prop('disabled', false);
    else
        submit.prop('disabled', true);
});