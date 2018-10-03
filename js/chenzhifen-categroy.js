//入口函数
$(function(){
    var man=new Man();
    //调用查询分类标题的数据
    man.queryCateTitle();
    //获取表格列表数据的函数
    man.queryTableListData();
});
//构造函数
var Man=function(){

}
//给构造函数的原型添加方法
 Man.prototype={
    //  //定义分类标题的id
    //  id:0,

    //获取分类标题的函数
    queryCateTitle:function(){
        
       
        $.ajax({
            url:'http://localhost:9090/api/getcategorytitle',
            success:function(data){
                // console.log(data);
               
                //渲染模板
                var html=template('titleTmp',data);
                //把页面放到的main里面
                $('#main').html(html);
            }
        })
       
    },
    //获取表格列表数据的函数
    queryTableListData:function(){
       //给标题按钮添加点击事件
      
       $('#main').on('tap','.title-btn',function(){
           
           //获取标题的id
           var id=$(this).data('id');
           //发送请求数据
           $.ajax({
               url:'http://localhost:9090/api/getcategory',
               data:{titleid:id},
               success:function(data){
               
                var arr=data.result;
                var newArr=[];
                for(var i=0;i<arr.length;i++){
                    newArr.push(arr[i].category); 
                }
               

                var len = newArr.length;
                var n = 3; //假设每行显示3个
                var lineNum = len % 3 === 0 ? len / 3 : Math.floor( (len / 3) + 1 );
                var res = [];//定义一个二维数组
                 for (let i = 0; i < lineNum; i++) {
                 // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
                 var temp = newArr.slice(i*n, i*n+n);
                 res.push(temp);
                 }
                //  console.log(res);
                 var arr=[];
                 for(var i=0;i<res.length;i++){
                    arr.push(` 
                  <tr>          
                  <td>
                      <a href="Prolist.aspx?id=4">${res[i][0]}</a>
                  </td>
                  <td>
                      <a href="Prolist.aspx?id=4">${res[i][1]||''}</a>
                  </td>
                  <td>
                      <a href="Prolist.aspx?id=4">${res[i][2]||''}</a>
                  </td>
                     </tr>`)
                 }

                //  console.log(arr);   
                 var str=arr.join('');
                        
                 //把页面放到
               $('.table').html(str);
               
               
               }
           })

           
       })
    }

    
}