$(function() {
    var shengqian = new Shengqian();
    shengqian.getdata();
    shengqian.pagetap();
});

var Shengqian = function() {

};
Shengqian.prototype = {
    page: 1,
    totalpage: 1,
    getdata: function() {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: { pageid: that.page },
            dataType: 'json',
            type: 'get',
            success: function(data) {
                console.log(data);
                var html = template('dataTmp', data);
                $('#main ul').html(html);
            }
        })
    },
    pagetap: function() {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: { pageid: that.page },
            dataType: 'json',
            type: 'get',
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
            that.getdata();
        });
        $('.pre button').on('tap', function() {
            that.page = (--that.page) < 1 ? that.totalpage : that.page;
            that.getdata();
            var sel = document.getElementsByClassName('choose')[0];
            sel.value = that.page;
        });
        $('.next button').on('tap', function() {
            that.page = (++that.page) > that.totalpage ? 1 : that.page;
            that.getdata();
            var sel = document.getElementsByClassName('choose')[0];
            sel.value = that.page;
        })
    }
}
