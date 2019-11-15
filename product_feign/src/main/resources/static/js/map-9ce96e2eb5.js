$(function () {
    var token = $('#tokenval').val();
    var leftLng = '';
    var leftLat = '';
    var rightLng = '';
    var rightLat = '';
    var xiaoquaidi = '';
    var pagelist = $.trim($('input[name="map-page-number"]').val());
    var location = $.trim($('#location').val());
    var mapList = $('.map-room-box');
    var selectlist = $('.selectlist li');
    var level = '1';
    //智能查询box
    function intelligentSelect(id) {
        return document.getElementById(id);
    }

    document.onselectstart = new Function("event.returnValue=false;");
    // 百度地图API功能
    var mp = new BMap.Map("allmap", {minZoom: 11, maxZoom: 18, enableMapClick: false});
    var top_left_navigation = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_ZOOM
    });
    mp.addControl(top_left_navigation);
    mp.centerAndZoom(new BMap.Point(location.split(',')[0], location.split(',')[1]), 12);
    mp.enableScrollWheelZoom();
    //自定义覆盖物公用方法
    function ComplexCustomOverlay(point, text, mouseoverText) {
        this._point = point;
        this._text = text;
        this._overText = mouseoverText;
    }

    ComplexCustomOverlay.prototype = new BMap.Overlay();
    //自定义覆盖物小房子图标定位
    ComplexCustomOverlay.prototype.initialize = function (map) {
        this._map = map;
        var div = this._div = document.createElement("div");
        div.setAttribute('class', 'mapviewbox');
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        var span = this._span = document.createElement("span");
        div.appendChild(span);
        span.appendChild(document.createTextNode(this._text));
        var that = this;
        var arrow = this._arrow = document.createElement("p");
        arrow.style.left = 0;
        arrow.appendChild(document.createTextNode(this._overText));
        div.appendChild(arrow);
        mp.getPanes().labelPane.appendChild(div);
        return div;
    }
    ComplexCustomOverlay.prototype.draw = function () {
        var pixel = mp.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
        this._div.style.top = pixel.y + "px";
    }
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": "suggestId"
            , "location": mp
        });
    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        intelligentSelect("searchResultPanel").innerHTML = str;
    });
    var myValue;
    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        intelligentSelect("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        setPlace('15');
    });
    $('.map-search-box a').click(function () {
        myValue = $('#suggestId').val();
        setPlace('15');
    });
    $('#suggestId').on('keyup', function () {
        if (event.keyCode == 13) {
            $('.map-search-box a').click();
        }

    });
    function setPlace(num) {
        mp.clearOverlays();
        function myFun() {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            mp.centerAndZoom(pp, num);
            mp.addOverlay(new BMap.Marker(pp));    //添加标注
        }

        var local = new BMap.LocalSearch(mp, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
        setTimeout(function () {
            readMapCoor();
        }, 600);
    }

    //默认房源列表
    readMapCoor();
    //监听拖拽
    mp.addEventListener("dragend", function showInfo() {
        $('input[name="select-id"]').val('');
        resetMapCoor();
    });
    //监听缩放
    mp.addEventListener("zoomend", function () {
        if (mp.getZoom() < 13) {
            level = '1';
        } else if (mp.getZoom() < 15) {
            level = '2';
        } else {
            level = '3';
        }
        resetMapCoor();
    });
    //重置地图图标并读取地图坐标方法
    function resetMapCoor() {
        mp.clearOverlays();
        readMapCoor();
    }

    //读取地图坐标
    function readMapCoor() {
        var bs = mp.getBounds();   //获取可视区域
        var bssw = bs.getSouthWest();   //可视区域左下角
        var bsne = bs.getNorthEast();   //可视区域右上角
        leftLng = bssw.lng;
        leftLat = bssw.lat;
        rightLng = bsne.lng;
        rightLat = bsne.lat;
        $('input[name="select-id"]').val('');
        $('.mapviewbox').removeClass('active');
        $('input[name="map-page-number"]').val('1');
        mapOnloadMethod(leftLng, leftLat, rightLng, rightLat, level);
    }

    //小区click
    $('div').delegate('.small', 'click', function (evt) {
        evt.stopPropagation();
        if ($(this).hasClass('active')) {
            xiaoquaidi = '';
        } else {
            xiaoquaidi = $(this).attr('xiaoqu-name');
        }
        $('input[name="select-id"]').val(xiaoquaidi);
        $('input[name="map-page-number"]').val('1');
        mapOnloadMethod(leftLng, leftLat, rightLng, rightLat, level);
    });
    $('div').delegate('.big', 'click', function (evt) {
        evt.stopPropagation();
        myValue = $(this).find('span').text();
        setPlace('13');
        readMapCoor();
    });
    $('div').delegate('.mid', 'click', function (evt) {
        evt.stopPropagation();
        myValue = $(this).find('span').text();
        setPlace('15');
        readMapCoor();
    });


    //地图筛选条件
    $('.selection').hover(function () {
        $(this).find('.selection-content').show();
    }, function () {
        $(this).find('.selection-content').hide();
    });
    //单选
    $('.selection-content label').each(function () {
        $(this).hover(function () {
            $(this).addClass('on');
        }, function () {
            $(this).removeClass('on');
        }).click(function () {
            $(this).siblings('label').removeClass('active');
            $(this).addClass('active');
            $(this).parents('.selection-content').siblings('input').val($(this).attr('value'));
            $(this).parents('.selection-content').siblings('span').text($(this).text());
            $(this).parents('.selection-content').hide();
            $('input[name="map-page-number"]').val('1');
            mapOnloadMethod(leftLng, leftLat, rightLng, rightLat, level);
        })
    });
    //朝向选择
    $('.chaoxiang-box b').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('#roomfangxiang').val($('#roomfangxiang').val().replace($(this).text() + '-', ''));
            if ($('.chaoxiang label').text().replace($(this).text(), '') == '') {
                $('.chaoxiang label').text('不限');
            } else {
                $('.chaoxiang label').text($('.chaoxiang label').text().replace($(this).text(), ''));
            }
        } else {
            $(this).addClass('on');
            $('#roomfangxiang').val($('#roomfangxiang').val() + $(this).text() + '-');
            if ($('.chaoxiang label').text() == '不限') {
                $('.chaoxiang label').text($(this).text());
            } else {
                $('.chaoxiang label').text($('.chaoxiang label').text() + $(this).text());
            }
        }
        $('input[name="map-page-number"]').val('1');
        mapOnloadMethod(leftLng, leftLat, rightLng, rightLat, level);
    });
    //不限朝向
    $('.chaoxiang-content p').click(function () {
        $('.chaoxiang-box b').removeClass('on');
        $('#roomfangxiang').val('');
        $('.chaoxiang label').text('不限');
        $('input[name="map-page-number"]').val('1');
        mapOnloadMethod(leftLng, leftLat, rightLng, rightLat, level);
    })
    //朝向box
    $('.chaoxiang-shadow').hover(function () {
        $(this).addClass('on');
    }, function () {
        $(this).removeClass('on');
    });
    //不限特色
    $('.selection-list.null').click(function () {
        $('.selection-list').removeClass('on');
        $(this).addClass('on');
        $('#hasToilet').val('')
        $('#hasBalcony').val('');
        $('#hasShower').val('');
        $('input[name="map-page-number"]').val('1');
        mapOnloadMethod(leftLng, leftLat, rightLng, rightLat, level);
    });
    //特色多重选项
    $('.selection-list').not('.null').each(function (i) {
        $(this).click(function () {
            $('.selection-list.null').removeClass('on');
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $(this).find('input').val('');
            } else {
                $(this).addClass('on');
                $(this).find('input').val('有');
            }
            $('input[name="map-page-number"]').val('1');
            mapOnloadMethod(leftLng, leftLat, rightLng, rightLat, level);
        });
    });

    $('.map-room-box').scroll(function () {
        if ($(this)[0].scrollTop + $(this).height() >= $(this)[0].scrollHeight) {
            $('input[name="map-page-number"]').val(parseInt($('input[name="map-page-number"]').val()) + 1);
            mapOnloadMethod(leftLng, leftLat, rightLng, rightLat, level, 'scroll');
        }
    });

    function mapOnloadMethod(leftBottomLng, leftBottomLat, rightTopLng, rightTopLat, level, set) {
        $.get("/map/room-search", {
            city_code: $('input[name="website-city-code"]').val(),
            level: level,
            page: $('input[name="map-page-number"]').val(),
            left_bottom_lng: leftBottomLng,
            left_bottom_lat: leftBottomLat,
            right_top_lng: rightTopLng,
            right_top_lat: rightTopLat,
            price: $('#pricenum').val(),
            bedroomNum: $('#roomnum').val(),
            rentType: $('#room-method').val(),
            bedroomType: $('#roominpor').val(),
            faceTo: $('#roomfangxiang').val(),
            hasToilet: $('#hasToilet').val(),
            hasBalcony: $('#hasBalcony').val(),
            hasShower: $('#hasShower').val(),
            search_text: $('input[name="select-id"]').val()
        }, function (room) {
            if (room.data.roomList.data.length > 0) {
                mapList.show();
                $('.searchnone').hide();
                var myCompOverlay = [];
                var hasRoom = room.data.roomMap;
                mp.clearOverlays();
                for (var i = 0; i < hasRoom.length; i++) {
                    var viewText = hasRoom[i].room_num_desc;
                    var viewTitle = hasRoom[i].title;
                    if (level == 3) {
                        viewTitle = hasRoom[i].title + ' ¥' + hasRoom[i].min_price + ' 起';
                        viewText = '';
                    }
                    mp.addOverlay(new ComplexCustomOverlay(new BMap.Point(hasRoom[i].lng, hasRoom[i].lat), viewTitle, viewText));
                    if (level == 3) {
                        $('.mapviewbox').eq(i).attr('xiaoqu-name', hasRoom[i].title);
                    }
                }
                if (mp.getZoom() < 13) {
                    $('.mapviewbox').removeClass('small');
                    $('.mapviewbox').removeClass('mid');
                    $('.mapviewbox').addClass('big');
                } else if (mp.getZoom() < 15) {
                    $('.mapviewbox').removeClass('small');
                    $('.mapviewbox').removeClass('big');
                    $('.mapviewbox').addClass('mid');
                } else {
                    $('.mapviewbox').removeClass('mid');
                    $('.mapviewbox').removeClass('big');
                    $('.mapviewbox').addClass('small');
                }
                $('.mapviewbox').hover(function () {
                    $(this).addClass('on');
                }, function () {
                    $(this).removeClass('on');
                });
                $('.mapviewbox').each(function () {
                    if ($(this).attr('xiaoqu-name') == $('input[name="select-id"]').val()) {
                        $(this).addClass('active');
                    }
                })
                addRoom(room.data.roomList.data, set);
            } else {
                if ($('input[name="map-page-number"]').val() == '1') {
                    mapList.hide().html('');
                    $('.searchnone').show();
                    mp.clearOverlays();
                } else {
                    $('.map-room-box').unbind('scroll');
                }
            }
        });
    }

    //添加房间
    function addRoom(len, set) {
        var lnum = len.length;
        var html = '';
        var mapviewbox = $('.mapviewbox.small')
        for (var i = 0; i < lnum; i++) {
            var type = '合租';

            if (len[i].rent_type == '1') {
                type = '整租';
            }
            if (len[i].rent_type == '2') {
                type = '合租';
            }
            if (len[i].rent_type == '3') {
                type = '月租';
            }
            html += '<a href="/room/' + len[i].public_id + '.html" target="_blank">' +
                '<img src="' + len[i].list_pic + '"/>' +
                '<div class="map-room-text">' +
                '<span>' + len[i].name + '</span>' +
                '<p>' + type + ' · ' + len[i].bedroom_num + '室' + len[i].parlor + '厅 | ' + len[i].area + '</p>' +
                '<p>' + len[i].nearest_subway_title + '</p>' +
                '<label>￥' + len[i].price + '<em>每月</em></label>' +
                '</div>' +
                '</a>';
        }
        if (!set) {
            mapList.html('');
        }
        $('.map-room-box').append($(html));
    }
});