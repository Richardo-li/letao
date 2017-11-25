$(function() {


    /*下拉组件*/

    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function() {
                    setTimeout(function() {
                        queryProductDetail(
                            function() {
                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                /* 轮播图 */
                                mui('.mui-slider').slider({
                                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                                });
                                mui(".mui-numbox").numbox();
                            }
                        );
                    }, 1000)
                }
            }
        }
    });



    // /product/queryProductDetail
    function queryProductDetail(callback) {
        var id = getURLParams("productId");
        $.ajax({
            url: "/product/queryProductDetail?id=" + id,
            success: function(result) {
                // result.sizeArr=[40,41,..50];

                var start = result.size.split("-")[0];
                var end = result.size.split("-")[1];
                var arr = [];
                for (var i = start; i <= end; i++) {
                    arr.push(i);
                }

                // console.log(arr);
                result.sizeArr = arr;
                // console.log(result);
                var html = template("mainTpl", result);
                // console.log(html);
                $(".lt_view ul").html(html);

                callback && callback(result);
            }
        })
    }


    /* 轮播图 */
    mui('.mui-slider').slider({
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });



    $('body').on('tap', '.p_size', function() {
        $(this).addClass("p_active").siblings().removeClass("p_active");


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



    $('.add_cart').on('tap', function() {
        var size = $('.p_size.p_active').html(); //获取size
        var num = $(".mui-numbox-input").val();

        if (!size) {
            mui.toast('请选择尺码');
            return;
        }
        if (num < 1) {
            mui.toast('请选择数量');
            return;
        }
        //判断是否登录


        $.ajax({
            url: '/cart/addCart',
            data: { productId: getURLParams("productId"), num: num, size: size },
            type: 'post',
            success: function(res) {
                // console.log(res);
                if (res.error == 400) {
                    // 未登录
                    // alert();
                    location.href = "login.html?returnUrl=" + location.href; //截取当前路径发过去 ，登录后跳转回当前页
                } else {
                    //  已登录
                    mui.confirm("是否要跳转到购物车页面", "成功添加", ["跳转", "不跳"], function(e) {
                        // console.log(e);
                        if (e.index == 0) {
                            // 跳
                            alert("跳");
                        } else if (e.index == 1) {
                            // 不跳
                        }
                    });
                }
            }
        })

    })










})