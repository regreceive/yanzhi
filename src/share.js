import $ from 'jquery'
var weixin = {
  initShare: function(shareData) {
    if (!shareData) {
      shareData = default_data
    }

    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
      WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke(
          'sendAppMessage',
          {
            appid: 'wx69b6673576ec5a65',
            img_url: shareData.share_img_url,
            img_width: '',
            img_height: '',
            link: shareData.share_url,
            title: shareData.share_title,
            desc: shareData.share_content,
          },
          function(res) {
            window._czc && _czc.push(['_trackEvent', '微信分享', '微信分享_微信好友'])
          },
        )
      })
      // 分享到朋友圈
      WeixinJSBridge.on('menu:share:timeline', function(argv) {
        WeixinJSBridge.invoke(
          'shareTimeline',
          {
            img_url: shareData.share_img_url,
            img_width: '',
            img_height: '',
            link: shareData.share_url,
            title: shareData.share_title,
            desc: shareData.share_content,
          },
          function(res) {
            window._czc && _czc.push(['_trackEvent', '微信分享', '微信分享_微信朋友圈'])
          },
        )
      })
    })
  },
}

window.weixin = weixin

var share_data = {
  share_url: 'https://weixin.echoex.io/' + Math.random(),
  share_img_url: 'http://static.xiaojukeji.com/site/pages/2016-08-03/img/share.jpg',
  share_title: '论任性的夏天，正确的出门方式',
  share_content: '枯藤老树昏鸦，空调WiFi西瓜，滴滴送你回家。',
  share_from: '滴滴出行',
}
weixin.initShare(share_data) //微信分享
