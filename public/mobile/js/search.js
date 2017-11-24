/* <div> ' + storageArr[x] + '<span class="icon_delete fa fa-close"></span> </div> */
$(function() {
    loadHistory();

    function loadHistory() {
        var ls = localStorage;

        var arr = (ls.getItem("LT_history") && JSON.parse(ls.getItem("LT_history"))) || [];

        if (arr.length < 1) {
            $(".search_his_box").html('');
            return;
        }

        var strArr = [];
        for (var index = 0; index < arr.length; index++) {
            strArr.push('<div> ' + arr[index] + '<span class="icon_delete fa fa-close"></span> </div>');
        }
        $(".search_his_box").html(strArr.join(''));
    }

    $(".search_btn").on("tap", function() {
        var val = $(".search_text").val();
        // 去掉空格
        if (!$.trim(val)) {
            return false;
        }

        var ls = localStorage;
        var arr = (ls.getItem("LT_history") && JSON.parse(ls.getItem("LT_history"))) || [];

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
            }
        }
        arr.unshift(val);
        ls.setItem("LT_history", JSON.stringify(arr));

        // loadHistory();  //重新渲染

        // 跳转页面
        location.href = "searchList.html?key=" + val;
    })


    // 清空
    $(".clearAll").on("tap", function() {
        localStorage.setItem("LT_history", JSON.stringify([]));
        loadHistory();
    })

    // 事件委托 
    $("body").on("tap", ".icon_delete", function() {

        var index = $(this).parent().index();
        var ls = localStorage;
        var arr = (ls.getItem("LT_history") && JSON.parse(ls.getItem("LT_history"))) || [];
        arr.splice(index, 1);

        ls.setItem("LT_history", JSON.stringify(arr));
        loadHistory();
    })
})







/*

localStorage 本地存储


存储到本地：
  
   var setArr=['1','2','3','4','5'];
  
   localStorage.setItem("history", JSON.stringify(setArr));     //把数组arr的值保存到key 为 history 的本地存储中
                            |                      |
                           key                   value


获取存储的数据:

   var getArr=[];
      
   arr = localStorage.getItem("lt_history") && JSON.parse(localStorage.getItem("lt_history"));


清空数据：

    localStorage.setItem("history", JSON.stringify([]));  //把数组变为空，即清空名为lt_history的数组

*/