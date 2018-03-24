<template>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <h1 slot="title">指南</h1>
            <h3>wordColud是基于Electron、Vue和wordcloud2.js的词云生成软件。通过输入关键词和权重系数即可生成。</h3>
            <h3>效果与
                <a @click="goToWeb">网页版词云</a>相同</h3>
            <h3>可自定义颜色或随机颜色。</h3>
            <h3>支持自定义旋转系数，让部分文字旋转。系数等于0时，不旋转。等于1时，全部旋转。</h3>
            <h3>支持输入外部url,生成具有特殊形状的文字。具体效果与图片大小、辨识度有关。</h3>
            <h3>支持自定义字体。</h3>
            <h3>可导出图片。</h3>
        </Card>
    </div>
</template>

<script>
export default {
  name: 'guide',
  methods: {
    goToWeb() {
      window.open('https://timdream.org/wordcloud2.js/#love')
    }
  }
}
</script>

<style>
.row-margin-top {
  margin-top: 2%;
}
.row-margin-bottom {
  margin-bottom: 2%;
}
.text-right {
    text-align: right;
}
</style>
