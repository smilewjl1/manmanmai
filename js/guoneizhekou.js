$(function () {
    //构造一个manmanmai函数对象
    var mananbuy = new ManManBuy();
    //页面加载调用查询
    mananbuy.queryProduct();
    //区域滚动
    mananbuy.productroll();
    //上拉和下拉
    mananbuy.initPulldownupRefresh();
    //跳转product的详情页
    mananbuy.productDetail();
});

//创建ManManBuy对象
var ManManBuy = function () { };

//像他的原型中添加函数方法
ManManBuy.prototype = {
    //模仿下拉刷新让其页面有变化
    num1: 0,
    num2: 16,
    //页面一打开,就要显示几条商品,建立查询函数
    queryProduct: function () {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getinlanddiscount',
            success: function (result) {
                //console.log(result);
                //不截取几个数据,会影响页面结构,因为有些找不到图片
                result.result.splice(3, that.num2);
                var html = template('productTem', result);
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
    //上拉刷新和下拉加载
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
                            $.ajax({
                                url: 'http://localhost:9090/api/getinlanddiscount',
                                success: function (result) {
                                    //console.log(result);
                                    var res = [];
                                    for (var i = 0; i < 4; i++) {
                                        res.push(result.result[Math.floor(Math.random() * 17)]);
                                    }
                                    //console.log(res);
                                    result.result = res;
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
                                    var length1 = $('#product .mui-scroll ul').find('li').length;
                                    console.log(length1);
                                    if (length1 <= 16) {
                                        var res = [];
                                        for (var i = 0; i < 4; i++) {
                                            res.push(result.result[Math.floor(Math.random() * 17)]);
                                        }
                                        //console.log(res);
                                        result.result = res;
                                        //调用模板生成html
                                        var html = template('productTem', result);
                                        $('#product ul').append(html);
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
    //.mui的下拉刷新插件里面的默认阻止了click事件 只能使用tap a标签的默认跳转也用不了
    //所以只能重新建立product的tap事件,来让页面发生跳转 因为页面的product都是之后生成的,只能事件委托
    productDetail: function () {
        $('#product .mui-scroll ul').on('tap', 'li', function () {
            //获取产品的id
            var id = $(this).data('productid');
            //console.log(id);
            window.location.href = "guoneidetail.html?productid=" + id;
        });
    }
}