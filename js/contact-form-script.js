/*==============================================================*/
// Contact Form  JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        }
        else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm(){
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var msg_subject = $("#msg_subject").val();
        var phone_number = $("#phone_number").val();
        var message = $("#message").val();
        var gridCheck = $("#gridCheck").val();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "https://mazooncars.ae/enquiry",
            data: $("#contactForm").serialize(),
            dataType:'json',
            success : function(response){
                if (response.status){
                    formSuccess();
                }
                else {
                    formError();
                    submitMSG(false,response.msg);
                }
            }
        });
    }
    function formSuccess(){
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!")
    }
    function formError(){
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }
    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h4 tada animated text-success";
        }
        else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

}(jQuery)); // End of use strict