<template>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">生成词云</p>
            <div :style="{height:this.height}" style="width：100%;" ref="desktop"></div>
        </Card>
    </div>
</template>
<script>
import { Button, Table } from 'iview'
import * as AA from 'js2wordcloud'
const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
export default {
  created(el) {
    console.log(this.$refs.desktop)
  },
  beforeMount() {
    
    let option = this.$store.state.Counter.createOption
     if(option.picHeight){
        this.height = option.picHeight
    }
  },
  data() {
    return {
      height: '400px'
    }
  },
  mounted() {
    let desktopPic = new AA(this.$refs.desktop)
    let isCreated = this.$store.state.Counter.isCreated
    let option = this.$store.state.Counter.createOption
    option.noDataLoadingOption = {  
        backgroundColor: '#eee',
        text: '暂无数据',
        textStyle: {
            color: '#888',
            fontSize: 14
        }
    }
    desktopPic.setOption(option)
        global.onresize = function() {
          desktopPic.resize()
        }
  }
}
</script>
<style>

</style>
