<template>
  <div class="list" v-cloak>
    <div class="my-top">
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item>
          <van-image class="img-responsive" :src="banner" />
        </van-swipe-item>
      </van-swipe>
      <div class="seach-box">
        <van-search
          v-model="sh.title"
          shape="round"
          @search="onSearch"
          background="rgba(79, 192, 141, 0)"
          placeholder="请输入查询关键词"
        />
      </div>
    </div>
    <div class="content-box">
      <div class="list-box">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finishedText"
            :offset="100"
            @load="onLoad"
          >
            <van-cell
              class="just-list"
              v-for="(item, inx) in lsArr"
              :key="inx"
              @click="goDetails(item.id)"
              is-link
              :title="item.title"
            />
            <div class="just-list" v-if="lsshow">
              <Tips></Tips>
            </div>
          </van-list>
        </van-pull-refresh>
        <div style="padding: 23px 0;"></div>
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
      lsshow: false, // 是否无数据
      finishedText: '我是有底线的', // 底部提示
      showChild: -1,
      sh: {
        title: '',
      },
      class_id: '0',
      method: 'ArtLs',
      banner: require('@/assets/images/banner.png'),
      loading: false,
      finished: false,
      isLoading: false, // 是否处于下拉刷新状态
      pageSize: 15, // 每页显示条数
      pageNo: 0, // 当前页码
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
    }
  },
  components: { Tips },
  created() {
    // this.getList()
    let item = JSON.parse(this.$route.query.item)
    this.method = 'ArtLs'
    this.class_id = item.class_id || item
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
    /**
     * 搜索
     */
    onSearch() {
      // console.log(this.sh.title)
      // this.pageSize = 15
      this.pageNo = 0
      this.onLoad()
    },
    onLoad() {
      this.pageNo++
      this.getList()
    },
    /**
     * 下拉刷新
     */
    onRefresh() {
      this.finished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.loading = true
      this.pageNo = 0
      this.onLoad()
    },

    getList() {
      let _this = this
      let token = '1234'
      let model = {
        request_id: new Date().getTime(),
        method: _this.method,
        datetime: new Date().getTime(),
        sign: hex_md5(
          'method=' +
            _this.method +
            '&datetime=' +
            new Date().getTime() +
            '&' +
            token
        ),
        data: {
          class_id: _this.class_id,
          sh: _this.sh,
          page: _this.pageNo, // 当前页码
          limit: 15, // 每页显示条数
        },
      }

      model = Base64.encode(JSON.stringify(model))
      // console.log(model)
      _this.ajaxPost(
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
              // this.lsArr = data.return_data.ls
              const rows = data.return_data.ls
              if (rows == null || rows.length === 0) {
                // 加载结束
                _this.finished = true
                // return
              } else {
                _this.finished = false
              }
              if (rows.length < _this.pageSize) {
                // 最后一页不足10条的情况
                _this.finished = true
              }
              // 处理数据
              if (_this.pageNo === 1) {
                _this.lsArr = rows
                if (_this.lsArr.length === 0) {
                  _this.lsshow = true
                  _this.finishedText = ''
                } else {
                  _this.lsshow = false
                  _this.finishedText = '我是有底线的'
                }
              } else {
                _this.lsArr = _this.lsArr.concat(rows)
              }
              _this.isLoading = false
              _this.loading = false
            }
          }
        }
      )
    },
    // 前往详情
    goDetails(id) {
      this.$router.push({
        name: 'Show',
        query: {
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
.list-box .van-cell {
  padding: 16px 20px;
  min-height: 100px;
}
.list-box .van-cell:first-child {
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
}
.list-box .van-cell:last-child {
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
}
.seach-box {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
</style>
