$(function() {
    var xiangqing = new Xiangqing();
    xiangqing.productid = xiangqing.getQueryString('productId');
    xiangqing.categoryid = xiangqing.getQueryString('categoryId');
    xiangqing.bname = xiangqing.getQueryString('bName');
    xiangqing.getnav(xiangqing.bname);
    xiangqing.ptxq();
    xiangqing.pingjia();
});
var Xiangqing = function() {

};
Xiangqing.prototype = {
    getnav: function(bname) {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getcategorybyid',
            type: 'get',
            data: { categoryid: that.categoryid },
            dataType: 'json',
            success: function(data) {
                console.log(data);
                var data1 = { result1: [{ d1: bname, data }] };
                var html = template('navTmp', data1);
                $('#nav').html(html);
            }
        })
    },
    ptxq: function() {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getproduct',
            data: { productid: that.productid },
            type: 'get',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                var html = template('ptxqTmp', data);
                $('.product').html(html);
            }
        })
    },
    pingjia: function() {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getproductcom',
            data: { productid: that.productid },
            type: 'get',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                var html = template('pingjiaTmp', data);
                $('.pingjia').html(html);
            }
        })
    },
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
}
