$(function () {
       var mmb = new Manmanbuy();
       mmb.getIndexNav(); 
       mmb.getMoneyctrl(); 
})

var Manmanbuy = function () {
        
}

Manmanbuy.prototype = {
    //获取首页导航数据
    getIndexNav:function () {
        // 1. 请求获取首页导航数据的API
        $.ajax({
            url:'http://localhost:9090/api/getindexmenu',
            success:function (data) {
                console.log(data);
                var html = template('indexNavTmp',data);
                $('#nav .mui-row').html(html);
            }
        })
    },
    getMoneyctrl:function () {
        // 1. 请求首页折扣商品列表数据
        $.ajax({
            url:'http://localhost:9090/api/getmoneyctrl',
            success:function (data) {
                console.log(data);
                var html = template('productListTmp',data);
                $('#productlist .mui-table-view').html(html);
            }
        })
    }
}