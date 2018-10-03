$(function(){
	var manbuy = new Manbuy();
	//调用获取优惠券的数据
	manbuy.getCoupon();
	//调用给所有的优惠券添加点击按钮
	// manbuy.couponList();
	manbuy.getQueryString();
})

var Manbuy = function(){

}
Manbuy.prototype = {
	//获取分类数据函数
	getCoupon:function(){
		$.ajax({
			url:'http://localhost:9090/api/getcoupon',
			success:function(data){
				console.log(data);
				//调用模板引擎生成模板
				var html = template('couponTmp',data);
				//把生成的html放到分类的ul里面
				$('.coupon ul').html(html);
			}
		})
	},
	//给所有的优惠券添加点击按钮
	// couponList:function () {
 //        // 1. 给所有的购买按钮添加点击事件
 //        $('.coupon ul').on('tap','li a',function () {
 //            // 2. 获取当前点击按钮的id
 //            var id = $(this).data('couponId');
 //            // 3. 跳转到商品详情页面并且跟上商品id参数
 //            window.location.href = 'getcouponproduct.html?couponId='+id;
 //        });
 //    },
    //专门获取地址栏参数的方法
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
}
