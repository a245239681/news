<template>
  <div>
    <div class="p70">
      <van-image class="img-responsive" :src="tips" />
    </div>
    <div class="just-list">
      <p class="pt50 text">暂无记录</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  data() {
    return {
      tips: require('@/assets/images/no.png'),
    }
  },
}
</script>

<style>
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}
.p70 {
  padding: 0 144px;
}
.pt50 {
  padding-top: 100px;
}
.pt150 {
  padding-top: 300px;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  font-size: 32px;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
  line-height: 60px;
}
</style>
