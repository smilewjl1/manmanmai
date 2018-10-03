$(function(){
    var bcj=new Bcj();
    bcj.slide();
    bcj.getTitle();
    bcj.getProductcate(0);
    bcj.clickTitle();
    bcj.titleCeiling();
    bcj.back();
})

// 创建一个对象
var Bcj=function(){

};
Bcj.prototype={
    slide:function(){
        var gallery = mui('.mui-slider');
        gallery.slider({
        interval:500//自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    //获取标题栏
    getTitle:function(){
        $.ajax({
            url:"http://localhost:9090/api/getbaicaijiatitle",
            success:function(obj){
                var html=template("title",{list:obj.result});
                $("#all .nav ul").html(html);
            }
        })
    },
    //标题栏的点击事件
    clickTitle:function(){
        var that=this;
        //事件委托的方式
        $("#all .nav ul").on("tap","li a",function(){
            $(this).addClass("active").parent().siblings().children().removeClass("active");
            //获取被点击元素的id
            var id=$(this).data("id");
            that.getProductcate(id);
        })
    },
    //对应分类的商品
    getProductcate:function(id){
        $.ajax({
            url:"http://localhost:9090/api/getbaicaijiaproduct",
            data:{titleid:id},
            success:function(obj){           
                var html=template("product",obj.result);
                $("#all .content ul").html(html);
            }
        })
    },
    //页面滚动banner距离时，标题栏吸顶
    titleCeiling:function(){
        $(document).on("scroll",function(){
            //console.log(1);
            // console.log($(document).scrollTop());
            if($(document).scrollTop()>$("#banner").height()){
                //title的高度
                headerheight=$("#header").height();
                navheight=$("#all .nav").height();
                $("#all .nav").addClass("static");
                $("#all .nav").css("top",headerheight);
                $("#all .content").css("top",navheight)
                
            }else{
                $("#all .nav").removeClass("static");
                $("#all .content").css("top",0);
            }
        })
    },
    //点击回到页面顶部
    back:function(){
        $("#footer").on("tap",function(){
            $("html").stop().animate({
                scrollTop:0
            },1000);
            return false;
            // $(document).scrollTop("0px");
        })
    }
};