$(function() {


    $('.hide_menu').click(function() {
        $('.lt_view').toggleClass('p0');
    })



    $(".log_Out").click(function() {
        /* 
        1 发送请求到后台 让后台删除 sesstion /employee/employeeLogout
      */

        $.ajax({
            url: "/employee/employeeLogout",
            success: function(result) {
                //  console.log(result);
                if (result.success) {
                    // 跳转页面
                    location.href = "/admin/login.html";
                }
            }
        });

    })



})