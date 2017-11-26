$(function() {

    //保存认证码
    var VCODE = null;


    //注册
    $('.registerBtn').on('tap', function() {
        //获取表单信息
        var dataVal = {
                username: $.trim($('.mobile').val()),
                password: $.trim($('.password').val()),
                mobile: $.trim($('.mobile').val()),
                vCode: $.trim($('.vCode').val())
            }
            // console.log(dataVal);

        if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(dataVal.username)) {
            mui.toast('请输入合法的号码');
            return false;
        }

        if (dataVal.password.length < 6) {
            mui.toast('密码不能少于6位');
            return false;
        }

        if (dataVal.password !== $('.password2').val()) {
            mui.toast('密码不一致');
            return false;
        }

        if (dataVal.vCode.length < 6) {
            mui.toast('请输入合法的认证码 😊');
            return false;
        }

        if (dataVal.vCode !== VCODE) {
            mui.toast('认证码错误');
            return false;
        }

        // 提交数据到后台 完成注册 
        $.ajax({
            url: "/user/register",
            type: "post",
            data: dataVal,
            success: function(result) {
                console.log(result);
                if (result.success) {
                    // 成功
                    mui.toast("注册成功");
                    setTimeout(function() {
                        location.href = "login.html";
                    }, 1000);
                }
                if (result.error && result.error == 403) {
                    // 用户名已经存在
                    mui.toast(result.message);
                }

            }
        })



    })


    $('.getCodeBtn').on('tap', function() {

        if ($(this).attr("disabled") == true) {
            // 当前不能点击
            return false;
        }
        $(this).attr("disabled", true);
        var that = this;

        // 修改按钮的文字提示
        $(that).html("正在发送哦")
            // 发送请求
        $.ajax({
            url: "/user/vCode",
            type: "get",
            success: function(result) {
                console.log(result.vCode);
                // 设置全局的vcode
                VCODE = result.vCode;
                var time = 10;
                // 开启倒计时
                var timeId = setInterval(function() {
                    time--;
                    $(that).html(time + "秒后再获取");
                    if (time == 0) {
                        clearInterval(timeId);
                        $(that).removeAttr("disabled");
                        $(that).html("获取认证码");
                    }
                }, 1000);
            }
        })



    })








})