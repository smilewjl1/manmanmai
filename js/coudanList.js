$(function(){
    var coudan=new Coudan();
    // coudan.initPulldownupRefresh();
    coudan.initpage();
       coudan.getgsshop();
       coudan.getgsshoparea();
       coudan.getgsproduct();
       coudan.gettitle();
})

var Coudan=function(){

}

Coudan.prototype={
     //定义全局的页数变量
     page: 1,
     //定义全局的没页大小的变量
     pageSize: 2,
     //店铺全局变量，默认值为0
     shopId:0,
    //定义一个地区全局变量
    areaId:0,
    // 获取商店
    //初始化，弹性
    initpage:function(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    
    getgsshop:function(){
        $.ajax({
            url:'http://localhost:9090/api/getgsshop',
           success:function(result){
            //    console.log(result);
               
            var html = template('popsortTmp', result);
            // console.log(html);
            
            $('#item1 ul').html(html);
            
           }
        })
    },
    // 获取收获地址
    getgsshoparea:function(){
        $.ajax({
            url:'http://localhost:9090/api/getgsshoparea',
           success:function(result){
            //    console.log(result);
               
            var html = template('poppriceTmp', result);
            // console.log(html);
            
            $('#item2 ul').html(html);
            
           }
        })
    },
    // 获取商品
    getgsproduct:function(){
        
        $.ajax({
            url:'http://localhost:9090/api/getgsproduct',
            data:{shopid:this.shopId,areaid:this.areaId},
           success:function(result){
            //    console.log(result);
               
            var html = template('shopTmp', result);
            // console.log(html);
            
            $('.shop ul').html(html);
            
           }
        })
    },

    gettitle:function(){
        var that=this;
    //    tab点击添加样式
        $('.tab .tab-item').click(function () {
           
            console.log($(this).prop("className"));
            if($(this).prop("className")=="tab-item active"){
                $(this).attr("class","tab-item");
                $(".titlecontent").css("display","none");
            }else{
                $(this).addClass('active').siblings('li').removeClass('active');
                $(".titlecontent").css("display","block");

                //找到当前输入移入的li标签的索引
                var idx = $(this).index();
                //对应的详情框显示
                $('.titlecontent>.item').eq(idx).addClass('on').siblings('div').removeClass('on');
            }
        });
        //给item下面的li注册点击事件，点击对应的li的时候，获取li上的id 等 属性，
        //根据获取商品函数渲染页面，
        //同时将其他li的on 属性取消，给被点击的li添加on属性，并且带on的属性展示到页面中
        //事件委托的方式给所有的li注册点击事件
        $(".titlecontent>#item1 ").on("tap","li" ,function(){
            //给当前元素添加on属性，兄弟移除on
            $(this).addClass("on").siblings().removeClass("on");
            //隐藏content页面
            $(".titlecontent").css("display","none");
            //给当前的全局变量赋值
            that.shopId=$(this).data("id");
            console.log(that.shopId);
            $(".titleList .tab .tab-item").eq(0).text($(this).data("acontent"));
            // 取消所有li标签中的active
            $('.tab ').children().removeClass("active");
            that.getgsproduct();

        });
        $(".titlecontent>#item2 ").on("tap","li" ,function(){
            //给当前元素添加on属性，兄弟移除on
            $(this).addClass("on").siblings().removeClass("on");
            //隐藏content页面
            $(".titlecontent").css("display","none");
            //给当前的全局变量赋值
            that.areaId=$(this).data("id");
            console.log(that.areaId);
            var txt=$(this).data("acontent").substr(0,2);
            console.log(txt);
            
            $(".titleList .tab .tab-item").eq(1).text(txt);
            $('.tab ').children().removeClass("active");
            //获取当前on的li中datacontent,填到title中
            that.getgsproduct();
        })

    },

       


  //专门获取地址栏参数的方法
//   getQueryString: function(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return decodeURI(r[2]);
//     return null;
// }
}