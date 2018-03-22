<template>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">生成词云</p>
            <ButtonGroup class="row-margin-bottom">
                <Button type="ghost" @click="downLoad" icon="archive">
                </Button>
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
      desktopPic: '',
      dom: '',
      downLoadResult: ''
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
    new Promise(function(res, rej) {
      that.desktopPic.setOption(option)
      that.dom = that.$refs.desktop.querySelector('canvas')
      res()
      console.log("aaaa")
    }).then(() => {
      
    })
   
    global.onresize = function() {
      that.desktopPic.resize()
    }
  },
  updated(){
      
  },
  methods: {
    reload() {
      this.desktopPic.resize()
    },
    deletePic() {
      this.desktopPic.setOption({})
      this.$store.dispatch('saveOption', {})
    },
    downLoad() {
       
        // that.downLoadResult= that.dom.toDataURL('image/png')
           var link = document.createElement('a');
    link.href = this.dom.toDataURL('image/png')
    link.download = 'woldCould';
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
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
