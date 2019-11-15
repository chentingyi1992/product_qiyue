$(function () {
    //onload
    pageLoadMethod('1', '');
    //热门房源
    $('.search-more a').click(function () {
        $('.search-box input').val($(this).text());
        $('.search-box a').click();
    });
    //页码选择
    $('body').on('click', '.pages-number a', function () {
        $('input[name="page-number"]').val($(this).text());
        pageLoadMethod($(this).text(), $('.search-box input').val());
    });
    //上一页
    $('body').on('click', '.prev-page', function () {
        $('input[name="page-number"]').val(parseInt($('input[name="page-number"]').val()) - 1);
        pageLoadMethod(parseInt($('input[name="page-number"]').val()), $('.search-box input').val())
    });
    //下一页
    $('body').on('click', '.next-page', function () {
        $('input[name="page-number"]').val(parseInt($('input[name="page-number"]').val()) + 1);
        pageLoadMethod(parseInt($('input[name="page-number"]').val()), $('.search-box input').val())
    });
    //搜索
    $('.search-box a').click(function () {
        pageLoadMethod('1', $('.search-box input').val());
    });
    document.onkeydown=function(event) {
        e = event ? event : (window.event ? window.event : null);
        if (e.keyCode == 13) {
            $('.search-box a').click();
        }
    }
    //猜你喜欢
    $.get('/room/guesslist/', function (data) {
        if (data.length > 0) {
            $.each(data, function (idx, item) {
                $('.guest-like').append('<a href="' + item.link + '" target="_blank">' +
                    '<img src="' + item.pic + '" title="' + item.address + '" alt="' + item.address + '图片">' +
                    '<span>￥' + item.price + '<em>元/月</em></span>' +
                    '<p>' + item.address + '</p>' +
                    '<p>' + item.subhead + '</p>' +
                    '</a>');
            });
        } else {
            $('.guest-you-like').hide();
        }
    });
});

function pageLoadMethod(page, search) {
    search = $.trim(search);
    $.get('/new-web-api/room/easy-rent?search_text=' + search + '&page=' + page, function (data) {
        var phtml = '';
        var ohtml = '';
        if (data.page != '1') {
            phtml += '<span class="prev-page">&lt;</span>';
        }
        for (var i in data.page_list) {
            if (data.page == data.page_list[i]) {
                phtml += '<a href="javascript:void(0)" class="on">' + data.page_list[i] + '</a>';
            } else {
                phtml += '<a href="javascript:void(0)">' + data.page_list[i] + '</a>';
            }
        }
        if (data.page != data.total_page) {
            phtml += '<span class="next-page">&gt;</span>';
        }
        $('.pages-number').html(phtml);
        if (!data.rooms.length > 0) {
            $('.room-list-box,.pages-number').hide();
            $('.notext_box').show();
            $('.notext_box strong').html('您查找的房源已售罄&nbsp;&nbsp;');
        } else {
            if (data.rooms.length < 9 && data.page == 1) {
                $('.pages-number').hide();
                $('.room-list-box,.notext_box').show();
                $('.notext_box strong').html('没有更多房源了&nbsp;&nbsp;');
            } else {
                $('.room-list-box,.pages-number').show();
                $('.notext_box').hide();
                $('.notext_box strong').html('您查找的房源已售罄&nbsp;&nbsp;');
            }
            for (var i in data.rooms) {
                ohtml += '<a href="' + data.rooms[i].url + '" target="_blank">';
                if (data.rooms[i].is_activity) {
                    ohtml += '<div class="hot-icon" style="background: ' + data.rooms[i].activity_info[0].tagColor + '">' + data.rooms[i].activity_info[0].tag + '</div>';
                }
                ohtml += '<img src="' + data.rooms[i].list_pic + '">';
                if (data.rooms[i].is_activity) {
                    ohtml += '<span>￥' + data.rooms[i].activity_info[0].yearReduceMoney + '<em>元/月</em><i>¥' + data.rooms[i].price + '元/月</i></span>';
                } else {
                    ohtml += '<span>￥' + data.rooms[i].price + '<em>元/月</em></span>';
                }
                ohtml += '<p>' + data.rooms[i].short_title + '</p>' +
                    '<p>' + data.rooms[i].nearest_subway_title + ' / ' + data.rooms[i].area + '㎡</p>' +
                    '</a>';
            }
            $('.room-list-box').html(ohtml);
        }
    });
}