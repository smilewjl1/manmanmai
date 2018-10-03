$(function() {
    var goods = s = new Goods();
    goods.productid = goods.getQueryString('productid');
    goods.getgoods();
});
var Goods = function() {

};
Goods.prototype = {
    getgoods: function() {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrlproduct',
            type: 'get',
            data: { productid: that.productid },
            dataType: 'json',
            success: function(data) {
                console.log(data);
                var html = template('goodsTmp', data);
                $('#main').html(html);
            }
        })
    },
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
}
