<template>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">生成词云</p>
            <ButtonGroup class="row-margin-bottom">
                <Button type="ghost" @click="downLoad" icon="archive"></Button>
                <Button type="ghost" @click="deletePic" icon="trash-a"></Button>
                 <Button type="ghost" @click="reload" icon="ios-reload"></Button>
            </ButtonGroup>

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
  beforeMount() {
    let option = this.$store.state.Counter.createOption
    if (option.picHeight) {
      this.height = option.picHeight
    }
  },
  data() {
    return {
      height: '400px',
      desktopPic:''
    }
  },
  mounted() {
     this.desktopPic = new AA(this.$refs.desktop)
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
    let that = this
    new Promise(function(res,rej){
        that.desktopPic.setOption(option)
        console.log("1")
        let dom = that.$refs.desktop.querySelector("canvas")

        res()
    }).then(()=>{
        console.log(2)

    })
    console.log(3)
    global.onresize = function() {
      this.desktopPic.resize()
    }
  },
  methods:{
      reload(){
          this.desktopPic.resize()
      },
      deletePic(){
          this.desktopPic.setOption({})
      },
      downLoad(){
          

        
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
</style>
