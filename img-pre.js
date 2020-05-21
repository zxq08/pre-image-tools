;(function ($) {
    /**
     * 构造函数
     * obj: 绑定的对象
     * imgArr: ['/img/a.png','/img/b.png'],  图片数组
     */
    $.fn.extend({
        PreImg: function (obj) {
            this.wrap = obj.obj;
            this.imgArr = obj.imgArr || [];
            var imgsdata = {}
            if (this.imgArr.length >= 1) {
                imgsdata = {
                    "list1": this.imgArr
                };
            } else {
                alert("图片不正确");
            }  
            var thumb = $('<div style="display:none" id="thumb" class="thumb" thumblist="list1"></div>');
            for (var i in this.imgArr) {
                var img =$('<img src='+ this.imgArr[i] +' class="pre-img"  />');
                thumb.append(img);
            }
            this.wrap.append(thumb)
            var swiper = $('<div class="swiper-container" id="pre-img-show"><div class="swiper-wrapper"></div><div class="swiper-pagination"></div><div class="upload"></div></div>')
            this.wrap.append(swiper);
            var swiper = new Swiper('.swiper-container', {
                zoom: true,
                width: window.innerWidth,
                virtual: true,
                spaceBetween: 20,
                pagination: {
                  el: '.swiper-pagination',
                  type: 'fraction'
                },
                on: {
                  click: function () {
                    $('#pre-img-show').fadeOut('fast')
                    this.virtual.slides.length = 0
                    this.virtual.cache = []
                    swiperStatus = false
                  }
                }
            })
            this.wrap.find('.pre-img-showImg').click(function () {
                clickIndex = $(this).index()
                imglist = $("#thumb").attr('thumblist')
                imgs = imgsdata[imglist]
                for (i = 0; i < imgs.length; i++) {
                  swiper.virtual.appendSlide('<div class="swiper-zoom-container"><img src="' + imgs[i] + '" /></div>')
                }
                swiper.slideTo(clickIndex)
                $('#pre-img-show').fadeIn('fast')
                swiperStatus = true
            })
            //切换图状态禁止页面缩放	
            document.addEventListener('touchstart', function (event) {
                if (event.touches.length > 1 && swiperStatus) {
                 event.preventDefault()
                }
            })
            var lastTouchEnd = 0
            document.addEventListener('touchend', function (event) {
                var now = (new Date()).getTime()
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault()
                }
                lastTouchEnd = now
            }, false)
            document.addEventListener('touchmove', function (e) {
                if (swiperStatus) {
                    e.preventDefault()
                }
            })
        }
    })
})(jQuery)
