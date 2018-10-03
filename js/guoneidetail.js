$(function () {
    //构造一个manmanmai函数对象
    var mananbuy = new ManManBuy();
    mananbuy.productid = mananbuy.getQueryString('productid')
    //调用查询商品信息的函数
    mananbuy.queryProductDetail();
    //添加新评论
    mananbuy.addArticle();
});

//创建ManManBuy对象
var ManManBuy = function () { };

//像他的原型中添加函数方法
ManManBuy.prototype = {
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
            url: 'http://localhost:9090/api/getdiscountproduct',
            data: {productid:that.productid },
            success: function (result) {
                //console.log(result);
                var html = template('prodetailTem',result);
                //console.log(html);
                $('#productdetail').html(html);   
            }
        });
    },
    addArticle: function(){
        //点击发表评论按钮,将评论添加到下方评论区 事件委托
        $('#productdetail').on('tap','.tjdp',function(){
            //console.log(this);
            //获取评论框文本
            var textartic = $('#ctl00_ContentBody_txt_nr').val();
            $('#ctl00_ContentBody_txt_nr').val('');
            //console.log(textartic);
            if(!textartic.trim()){
                mui.toast('评论内容不能为空');
                return false;
            }
            var li = document.createElement('li');
            li.innerHTML += textartic;
            $('.article .list ul').append(li);
        });
    }
}