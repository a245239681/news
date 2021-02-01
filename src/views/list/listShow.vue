<template>
  <div class="listshow" v-cloak>
    <div class="my-top">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <van-image class="img-responsive" :src="banner" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="content-box">
      <h3 class="pb10 h3">{{ details.title }}</h3>
      <div v-html="details.body">{{ details.body }}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
import axios from 'axios'
Vue.use(Toast)
import { hex_md5 } from '@/assets/js/md5.js'
import { Base64 } from 'js-base64'

export default {
  data() {
    return {
      // 详情
      details: {
        body: '',
        datetime: '1596191806',
        facepic: null,
        id: '35',
        pubtime: '1596191806',
        subtitle: '',
        text: '',
        title: '测试区直行政',
        updatetime: '1596191806',
        url: '',
        viewcount: '0',
      },
      showChild: -1,
      art_id: '0',
      method: 'ArtRow',
      banner: require('@/assets/images/banner.png'),
    }
  },
  created() {
    let d = this.$route.query.id
    this.art_id = d
    console.log(d)
    this.getList()
  },
  methods: {
    showNext(index) {
      if (index != this.showChild) {
        this.showChild = index
      } else {
        this.showChild = -1
      }
    },
    // 请求方法封装
    ajaxPost(url, params, method, callfunc, async) {
      axios({
        method: method,
        url: url,
        data: params,
        withCredentials: async,
        headers: {},
      })
        .then(function(result) {
          if (callfunc) {
            callfunc(result)
          }
        })
        .catch(function() {
          Toast('系统异常,请重试!')
        })
    },
    getList() {
      let token = '1234'
      let model = {
        request_id: new Date().getTime(),
        method: this.method,
        datetime: new Date().getTime(),
        sign: hex_md5(
          'method=' +
            this.method +
            '&datetime=' +
            new Date().getTime() +
            '&' +
            token
        ),
        data: {
          art_id: this.art_id,
        },
      }

      model = Base64.encode(JSON.stringify(model))
      // console.log(model)

      this.ajaxPost(
        'http://doccms.gxrswx.healthan.net/api',
        model,
        'POST',
        res => {
          // console.log(res)
          if (res.status === 200) {
            let data = Base64.decode(res.data) // 解码

            data = JSON.parse(data)
            console.log(data)
            if (data.code === 0 && data.error_code === 0) {
              this.details = data.return_data
            }
          }
        }
      )
    },
  },
}
</script>

<style>
html {
  background-color: #f4f7ff;
}
.my-top {
  position: relative;
}
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}
.content-box {
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #f4f7ff;
  margin-top: -60px;
  position: relative;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-shadow {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(12, 136, 254, 0.1);
  border-radius: 30px;
}
.p15 {
  padding: 0 30px;
}
.listshow .title-one {
  line-height: 40px;
  color: #171717;
  font-weight: bold;
}
.listshow img {
  max-width: 100%;
  height: auto;
  display: block;
}
.h120 {
  height: 120px;
}
.h100 {
  height: 100px;
  border-top: solid 3px #fefbff;
}
.content-bg {
  background-image: url('../../assets/images/content-bg.png');
  background-size: 100% 100%;
  color: #ffffff;
  font-size: 28px;
  margin-bottom: 30px;
}
.content-box .box:not(:last-child) {
  margin-bottom: 30px;
}
.showchild {
  display: none;
}
.f30 {
  font-size: 30px;
}
.f28 {
  font-size: 28px;
}
.pb10 {
  padding-bottom: 20px;
}
.h3 {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: rgba(23, 23, 23, 1);
}
</style>
