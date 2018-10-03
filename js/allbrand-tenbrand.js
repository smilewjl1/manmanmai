$(function(){
    var mmbuy = new MMbuy();
      mmbuy.brandTitleId =  mmbuy.getQueryString("brandTitleId");

    // 获取十大品牌
      mmbuy.querytenbrand();
    //   查询销量排行
    mmbuy. queryConsider();
    // 获取评论
    mmbuy.querycomment();

    mmbuy.pouseFooter();

})
var MMbuy = function(){

}
MMbuy.prototype = {
    // 获取十大品牌数据
    // commentdata:{},
    brandTitleId:1,
        querytenbrand:function(){
        var that=this;
       $.ajax({
            url:"http://localhost:9090/api/getbrand",
            data:{brandtitleid:that.brandTitleId},
            success:function(data){
                // console.log(data);
                var html = template("tenbrandTmp",data);
                $(".tenbrand").html(html);
                
        
            }

        })
    },
 
    // 查询销量排行数据
    queryConsider:function(){
       var that = this ;
      $.ajax({
          url:"http://localhost:9090/api/getbrandproductlist",
          data:{brandtitleid:that.brandTitleId,pagesize:10},
          success:function(data){
            //   console.log(data);
              var html = template("peoductDetailTmp",data);
              $(".product-content").html(html);
            // that.commentdata= data ;
            //   console.log(that.commentdata);
              
           
          }

      })
  },


    //  获取评论数据
    querycomment:function(){
        // console.log(this.commentdata);
        
       var that = this;
       $.ajax({
           url:"http://localhost:9090/api/getproductcom",
           data:{productid:0},
           success:function(data){
                // console.log(data);
               
            var html = template("commentTmp",{list:data.result});
            $(".comment-content").html(html);

            
               
           }
       })
      
    },


    // 底部点击关闭按钮隐藏底部
    pouseFooter:function(){
        $(".btn-guanbi").on("tap",function(){
            
            $("#footer").hide();
            
        })



    },




  //专门获取地址栏参数的方法
  getQueryString: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}


    
}