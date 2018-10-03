//入口函数
$(function(){
    var man=new Man();
    //调用查询菜单栏数据的函数
    man.queryMenuData();
    //获取商品列表数据的函数
    man.queryProductListData();
});
//构造函数
var Man=function(){

}
//给构造函数的原型添加方法
 Man.prototype={
    //查询菜单栏数据的函数
    queryMenuData:function(){
       
        $.ajax({
            url:'http://localhost:9090/api/getindexmenu',
            success:function(data){
               
                //渲染模板t
                var html=template('menTmp',data);
                //把页面放到的mui-row里面
                $('#nav .mui-row').html(html);
            }
        })
        //给更多按钮添加点击事件
        $('#nav .mui-row').on('tap',':nth-child(8)',function(){
          //  console.log(this);
           var rel= $('#nav .mui-row :nth-child(n+9)').hasClass('active');
           
            if( rel){
                $('#nav .mui-row :nth-child(n+9)').removeClass("active");
            }else{
                $('#nav .mui-row :nth-child(n+9)').addClass("active");
            }
           
        })
    },
    //获取商品列表数据的函数
    queryProductListData:function(){
        $.ajax({
            url:'http://localhost:9090/api/getmoneyctrl',
            success:function(data){
                
                 //渲染模板t
                 var html=template('productListTmp',data);
                  //把页面放到的mui-row里面
                $('#recommend .recommend-contant').html(html);
                
            }

        })
    }

    
}