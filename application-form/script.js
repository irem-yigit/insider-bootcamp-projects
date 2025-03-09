$(document).ready(function() {
    $("#applyButton").click(function() {
        $("#applicationForm").fadeIn();
    });

    $("#closeButton").click(function() {
        $("#applicationForm").fadeOut();
    });
    
    $("#applyForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            surname: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 10
            },
            position: {
                required: true
            }
        },
        messages: {
            name: "Enter your name (at least 2 characters).",
            surname: "Enter your surname (at least 2 characters).",
            email: "Enter a valid email address.",
            phone: "Enter a valid phone number.",
            position: "Enter the position you are applying for."
        },
        submitHandler: function(form) {
            $(".success").fadeIn().delay(3000).fadeOut();
            form.reset();
        }
    });

    $("#dob").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "1950:2023"
    });
    
    $("input[name='phone']").mask("(000) 000-0000");
});
