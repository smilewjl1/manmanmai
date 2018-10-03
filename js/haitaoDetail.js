$(function () {
    //构造一个manmanmai函数对象
    var mananbuy = new ManManBuy();
    mananbuy.productid = mananbuy.getQueryString('productid')
    //调用查询商品信息的函数
    mananbuy.queryProductDetail();
    //添加新评论
    mananbuy.addArticle();
    //热门推荐
    mananbuy.hotrecommendProduct();
});

//创建ManManBuy对象
var ManManBuy = function () { };

//像他的原型中添加函数方法
ManManBuy.prototype = {
    pageid:1,
    //专门获取地址栏参数的方法
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    //页面一打开,就要显示商品详细信息,建立查询函数
    queryProductDetail: function () {
        var that = this;
        //console.log(that.productid); 
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrlproduct',
            data: {productid:that.productid },
            success: function (result) {
                //console.log(result);
                var html = template('productdetailTem',result);
                //console.log(html);
                $('#productdetail .product').html(html);   
            }
        });
    },
    addArticle: function(){
        //点击发表评论按钮,将评论添加到下方评论区 
        $('.btn-atic').on('tap',function(){
            //console.log(this);
            //获取评论框文本
            var textartic = $('#input-area').val();
            $('#input-area').val('');
            //console.log(textartic);
            if(!textartic.trim()){
                mui.toast('评论内容不能为空');
                return false;
            }
            var li = document.createElement('li');
            li.innerHTML += textartic;
            $('.list ul').prepend(li);
        });
    },
    //热门推荐商品
    hotrecommendProduct: function () {
        var that = this;
        that.pageid = Math.floor(Math.random()*16);
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: { pageid: that.pageid },
            success: function (result) {
                //console.log(result);
                var html = template('productTem', result);   
                $('.hot-recommend ul').html(html);
            }
        });
    },
}