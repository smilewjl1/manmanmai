$(function() {
    var fenlei = new Fenlei();
    fenlei.categoryId = fenlei.getQueryString('categoryid') || 1;
    fenlei.getcatagoryName();
    fenlei.getpList();
    fenlei.pagetap();
});
var Fenlei = function() {

};

Fenlei.prototype = {
    page: 1,
    totalpage: 1,
    getcatagoryName: function() {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getcategorybyid',
            type: 'get',
            data: { categoryid: that.categoryId },
            dataType: 'json',
            success: function(data) {
                var html = template('navTmp', data);
                $('#nav').html(html);
            }
        })
    },
    getpList: function() {
        var that = this;
        console.log(that.page);
        $.ajax({
            url: 'http://localhost:9090/api/getproductlist',
            type: 'get',
            data: { categoryid: that.categoryId, pageid: that.page },
            dataType: 'json',
            success: function(data) {
                console.log(data);
                that.totalpage = Math.ceil(data.totalCount / data.pagesize);
                console.log(that.totalpage);
                var html = template('pList', data);
                $('.pList ul').html(html);
            }
        })
    },
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    pagetap: function() {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getproductlist',
            type: 'get',
            data: { categoryid: that.categoryId, pageid: that.page },
            dataType: 'json',
            success: function(data) {
                that.totalpage = Math.ceil(data.totalCount / data.pagesize);
                var sel = document.getElementsByClassName('choose')[0];
                sel.innerHTML = '';
                for (var i = 1; i <= that.totalpage; i++) {
                    var option = document.createElement('option');
                    var html1 = i;
                    var html2 = that.totalpage;
                    option.value = i;
                    option.innerHTML = html1 + ' / ' + html2;
                    sel.appendChild(option);
                };
            }
        });
        $('.choose').change(function() {
            that.page = this.value;
            that.getpList();
        });
        $('.pre button').on('tap', function() {
            that.page = (--that.page) < 1 ? that.totalpage : that.page;
            that.getpList();
            var sel = document.getElementsByClassName('choose')[0];
            sel.value = that.page;
        });
        $('.next button').on('tap', function() {
            that.page = (++that.page) > that.totalpage ? 1 : that.page;
            that.getpList();
            var sel = document.getElementsByClassName('choose')[0];
            sel.value = that.page;
        })
    }
}
