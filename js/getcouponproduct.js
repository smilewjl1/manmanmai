$(function(){
	var manbuy = new Manbuy();
	manbuy.couponId=manbuy.getQueryString('couponId');
	//调用根据url的参数来刷新页面
	// manbuy.getproductlist();
	//获取商品列表数据的函数
	manbuy.getproductlistData();
	//调用点击图片遮罩轮播方法
	manbuy.getPic();
})
var Manbuy = function(){

}
Manbuy.prototype = {
	    //初始化轮播图的方法
    		init: function() {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
			gallery.slider({
  			interval:500//自动轮播周期，若为0则不自动播放，默认为0；
		});
    },
	//获取商品列表数据的函数
	getproductlistData:function(){
		var that = this;
		//发送请求请求商品列表数据
		$.ajax({
			url: 'http://localhost:9090/api/getcouponproduct',
			data:{couponid:that.couponId,couponProductId:that.couponProductId,couponProductTime:that.couponProductTime,couponProductImg:that.couponProductImg,couponProductName:that.couponProductName,couponProductPrice:that.couponProductPrice},
			success:function(data){
				console.log(data);
				//调用模板引擎生成模板
				var html = template('couponlistTmp',data);
				//把生成的html放到分类的ul里面
				$('.cu-list ul').html(html);
				//把生成的html放到轮播图里面
			}
		})
	},
	//显示遮罩点击图片轮播事件
	getPic:function(){
			var that = this;
	//发送请求请求商品列表数据
	$.ajax({
		url: 'http://localhost:9090/api/getcouponproduct',
		data:{couponid:that.couponId,couponProductId:that.couponProductId,couponProductTime:that.couponProductTime,couponProductImg:that.couponProductImg,couponProductName:that.couponProductName,couponProductPrice:that.couponProductPrice},
		success:function(data){
				console.log(data);
			//获取商品id 
			var id = $(this).data('couponProductId');
			var html = template('sliderTmp',data);
			//把生成的html放到轮播图里面
			$('.mask').html(html);
			//调用初始化轮播图方法
			that.init();
		},
	});
	//给所有的图片添加点击事件 显示遮罩层
	$('.coupou-list').on('tap','.pic',function(){
			console.log(111);
			$('.mask').show();
	});
	//点击隐藏遮罩层
	$('.mask').on('tap',function(e){
		 e = e || window.event;
		 e.stopPropagation();
		// $('.mask').hide();
		});
	},
	//专门获取地址栏参数的方法
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
}