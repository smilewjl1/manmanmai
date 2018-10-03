$(function(){
    var mmbuy = new MMbuy();
    // 获取品牌数据
    mmbuy.querydata();
    
    mmbuy.pouseFooter();



})
var MMbuy = function(){

}
MMbuy.prototype = {
    // 获取品牌数据
    querydata:function(){
        $.ajax({
            url:"http://localhost:9090/api/getbrandtitle",
            success:function(data){
                // console.log(data);
                var html = template("brandlistTmp",data);
                $(".brandlist").html(html);
                
            }

        })
    },
 


    // 底部点击关闭按钮隐藏底部
    pouseFooter:function(){
        $(".btn-guanbi").on("tap",function(e){
            $("#footer").hide();
            
        })



    },











}