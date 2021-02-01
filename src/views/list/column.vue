<template>
  <div class="list" v-cloak>
    <div class="my-top">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <van-image class="img-responsive" :src="banner" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="content-box">
      <div>
        <van-row>
          <van-col
            span="24"
            class="mb15 box-shadow box"
            :key="inx"
            v-for="(item, inx) in ListArr"
          >
            <van-row class="just-list p15 h120 f30" @click="goNext(item)">
              <van-col span="20">
                <span class="title-one">
                  {{ item.name }}
                </span>
              </van-col>
              <van-col span="4" class="just-list">
                <van-icon :name="'arrow'" />
              </van-col>
            </van-row>
          </van-col>
          <van-col
            span="24"
            class="mb15 box-shadow box just-list p15 h120"
            v-show="showTips"
          >
            <Tips></Tips>
          </van-col>
        </van-row>
      </div>
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
import Tips from '@/components/tips'
export default {
  data() {
    return {
      // 列表数据
      ListArr: [], // 栏目数据
      lsArr: [], // 标题数据列表
      showChild: -1,
      class_id: '0',
      method: 'ArtClass',
      banner: require('@/assets/images/banner.png'),
      showTips: false, // 是否无数据
    }
  },
  components: { Tips },
  created() {
    let item = JSON.parse(this.$route.query.item)
    this.class_id = item.class_id

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
    goNext(item) {
      // 前往列表
      item = JSON.stringify(item)
      this.$router.push({
        name: 'List',
        query: {
          item: item,
        },
      })
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
          class_id: this.class_id,
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
            // console.log(data)
            if (data.code === 0 && data.error_code === 0) {
              if (this.method === 'ArtClass') {
                this.ListArr = data.return_data.sub
                this.ListArr.length === 0
                  ? (this.showTips = true)
                  : (this.showTips = false)
              }
            }
          }
        }
      )
    },
    // 前往详情
    goDetails(id) {
      this.$router.push({
        name: 'Show',
        params: {
          id: id,
        },
      })
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
.list .title-one {
  line-height: 40px;
  color: #171717;
  font-weight: bold;
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
</style>
