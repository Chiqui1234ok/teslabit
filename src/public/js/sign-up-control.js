let email = $('#email'), password1 = $('#password1'), password2 = $('#password2'), submit = $('#submitBtn');
if(email.val().length > 9 && password1.val().length > 7 && password2.val().length > 7)
    submit.prop('disabled', false);
else
    submit.prop('disabled', true);

email.keyup(function () {
    if(email.val().length > 9 && password1.val().length > 7 && password2.val().length > 7)
        submit.prop('disabled', false);
    else
        submit.prop('disabled', true);
});
password1.keyup(function () {
    if(email.val().length > 9 && password1.val().length > 7 && password2.val().length > 7)
        submit.prop('disabled', false);
    else
        submit.prop('disabled', true);
});
password2.keyup(function () {
    if(email.val().length > 9 && password1.val().length > 7 && password2.val().length > 7)
        submit.prop('disabled', false);
    else
        submit.prop('disabled', true);
});