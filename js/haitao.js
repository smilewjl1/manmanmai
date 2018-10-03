$(function () {
    //构造一个manmanmai函数对象
    var mananbuy = new ManManBuy();
    //页面一打开就加载product
    mananbuy.queryProduct();
    mananbuy.productroll();
    //分页功能
    mananbuy.initPulldownupRefresh();
    mananbuy.productDetail();
});

//创建ManManBuy对象
var ManManBuy = function () { };

//像他的原型中添加函数方法
ManManBuy.prototype = {
    //定义全局变量
    pageid: 1,
    totalCount: 0,
    currentPage: 1,
    //页面一打开,就要显示商品详细信息,建立查询函数
    queryProduct: function () {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: { pageid: that.pageid },
            success: function (result) {
                //console.log(result);
                var html = template('productTem', result);
                //console.log(html);
                that.totalCount = Math.ceil(result.totalCount / 10);
                //console.log(that.totalCount);
                $('#product ul').html(html);
            }
        });
    },
    //区域滚动
    productroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });
    },
    //分页功能
    initPulldownupRefresh: function () {
        var that = this;
        mui.init({
            pullRefresh: {
                container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    callback: function () {
                        setTimeout(function () {
                            that.pageid = Math.ceil(Math.random()*16);
                            console.log(that.pageid);
                            $.ajax({
                                url: 'http://localhost:9090/api/getmoneyctrl',
                                data: { pageid: that.pageid },
                                success: function (result) {
                                    console.log(result); 
                                    var html = template('productTem', result);
                                    $('#product ul').html(html);
                                    // 下拉数据渲染完毕就调用结束下拉刷新的方法
                                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                    //还要重置上拉加载更多 重置的时候会默认自动触发一次上拉加载
                                    mui('#refreshContainer').pullRefresh().refresh(true);
                                }
                            });
                        }, 1000)
                    }
                },
                up: {
                    contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    callback: function () {
                        setTimeout(function () {
                            $.ajax({
                                url: 'http://localhost:9090/api/getinlanddiscount',
                                success: function (result) {
                                    that.pageid++;
                                    if (that.pageid <= 16) {
                                        //调用模板生成html
                                        var html = template('productTem', result);
                                        $('#product ul').html(html);
                                        // 上拉加载据渲染完毕就调用结束上拉加载更多的方法
                                        mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                                    } else {
                                        // 结束上拉加载更多 并且提示没有更多数据
                                        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                    }
                                }
                            });
                        }, 1000)
                    }
                }
            }
        });
    },
    productDetail: function(){
        $('#product .mui-scroll ul').on('tap','li',function(){
            //console.log(this);   
            //获取产品的id
            var id = $(this).data('id');
            console.log(id);
            window.location.href = "haitaoDetail.html?productid="+id;
        });
    }
}