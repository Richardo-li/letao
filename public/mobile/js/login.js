$(function() {




    $('.loginBtn').on('tap', function() {
        var user = $('.userTxt').val();
        var pwd = $('.pwdTxt').val();
        // console.log(user, pwd);

        if (!$.trim(user)) { //如果账户为空
            mui.toast("请输入用户名");
            return false;
        }

        if (!$.trim(pwd)) { //如果账户为空
            mui.toast("请输入密码");
            return false;
        }

        $.ajax({
            url: '/user/login',
            // data: { username: 'itcast', password: '111111' },
            data: $("form").serialize(),
            type: 'post',
            success: function(res) {
                // console.log(res);
                if (res.success) {
                    // 登录成功后

                    location.href = getURLParams("returnUrl");


                } else {
                    mui.toast('用户名或账户错误，请重新输入');
                }
            }
        })

    })



    // 获取url上的参数的 
    function getURLParams(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }


})