$(function() {
    var bijia = new Bijia();
    bijia.getbiaoti();

});
var Bijia = function() {

};
Bijia.prototype = {
    getbiaoti: function() {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getcategorytitle',
            type: 'get',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                var html = template('biaoti', data);
                $('.mui-table-view').html(html);
                that.getliebiao();
            }
        })
    },
    getliebiao: function() {
        $('li').each(function() {
            var titleId = $(this).data('titleid');
            console.log(titleId);
            var mythis = $(this);
            $.ajax({
                url: 'http://localhost:9090/api/getcategory',
                type: 'get',
                data: { titleid: titleId },
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    html = template('liebiao', data);
                    mythis.find('.mui-row').html(html);
                }
            });
        });
    }
}
