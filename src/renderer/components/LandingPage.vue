<template>
  <div id="wrapper">
    <main>
      <Row :gutter="18">
        <Col :xs="{span:24}" :sm="{span:24}" :md="{span:24}" :lg="{span:12}">
        <Card dis-hover class="row-margin-bottom row-margin-top">
          <p slot="title">
            <span class="color-red">*&nbsp;</span>数据参数</p>
          <Form>
            <FormItem v-for="(item,itemIndex) in valueList" :label="'第' + item.index+ '个' ">
              <Row>
                <Col :xs="{span:3}" :sm="{span:6}" :lg="{span:4}" class="padding">
                <Input type="text" v-model="item.name" placeholder="请输入内容"></Input>
                </Col>
                <Col :xs="{span:9}" :sm="{span:12}" :lg="{span:8}" class="padding">
                <Slider :tip-format="getValueListSize" v-model="item.size" :step="1" :min="1" :max="16" show-stops></Slider>
                </Col>
                <Col :xs="{span:4}" :sm="{span:4}" :lg="{span:4}" class="padding">
                <Button @click="delectItem(itemIndex)" type="ghost">删除</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
          <Row>
            <Col>
            <Button type="dashed" @click="addItem()" long icon="plus-round">添加</Button>
            </Col>
          </Row>
        </Card>
        </Col>
        <Col :xs="{span:24}" :sm="{span:24}" :lg="{span:12}">
        <Card dis-hover class="row-margin-top">
          <p slot="title">画布设置</p>
          <Tooltip content="留空白使用0.65x的宽度" placement="top-start">
            <Row class-name="page-size-row">
              <Col span="12">画布宽度:
              <InputNumber v-model="picWidth" :step="20" :max="1000" :min="200"></InputNumber>
              </Col>
              <Col span="12">画布高度:
              <InputNumber v-model="picHeight" :step="20" :max="500" :min="100"></InputNumber>
              </Col>
            </Row>
          </Tooltip>
          <Tooltip placement="top-start">
            <div slot="content" class="tooltip-content">
              <span>调整像素密度显示权重</span>
              <span>网格和画布像素大小</span>
            </div>
            <Row class-name="row-margin-top">
              <Col span="24">像素密度（dppx）:
              <InputNumber v-model="fontSizeFactor" :step="0.1" :max="10" :min="0.1"></InputNumber>
              </Col>
            </Row>
          </Tooltip>
          <Row class="row-margin-top">
            <Col span="24">画布颜色:
            <ColorPicker alpha v-model="backgroundColor" recommend />
            </Col>
          </Row>
          <Row class="row-margin-top">
            <Col span="24">字体颜色:
            <transition name="fade">
              <ColorPicker :hue="false" v-show="!randomFontColor" v-model="color2" recommend />
            </transition>
            <i-switch v-model="randomFontColor" size="large">
              <span slot="open">随机</span>
              <span slot="close">关</span>
            </i-switch>
            <!-- <Button @click="showFontModalEvent" type="dashed">字体高级设置</Button> -->
            </Col>
          </Row>
          <Row class="row-margin-top">
            <Col>字体:
            <Select v-model="fontStyle" style="width:260px">
              <Option v-for="item in fontyList" :value="item" :key="item">{{ item }}</Option>
            </Select>
            </Col>

          </Row>
          <!-- <Modal v-model="showFontModal" title="字体颜色高级设置" @on-cancel="hideFontModalEvent">
            <p>编写JavaScript代码配置颜色</p>
            <Input v-model="value5" type="textarea" placeholder="请输入js函数">
            </Input>
          </Modal> -->
        </Card>
        <Card dis-hover class="row-margin-top">
          <p slot="title">导入图片</p>
          <p>
            <Icon type="information-circled"></Icon>
            <span>导入图片，根据图片内容轮廓生成对应的结构</span>
            <br>
            <label for="uploadimage" class="label-uploadimage row-margin-top">
              选择图片
            </label>
            <Button class="row-margin-top" v-show="isSelectFile" @click="clearFile" type="ghost" icon="ios-trash">清除</Button>
            <input type="file" @change="selectFile" ref="imgFile" name="uploadimage" accept="image/jpeg,image/png" id="uploadimage" :style="{display:'none'}">
            <div v-show="isSelectFile" class=" row-margin-top demo-upload-list">
              <img :src="imgFileDate">
            </div>
          </p>
        </Card>
        <Card dis-hover class="row-margin-top">
          <Button type="success" @click="createPic" long>确定生成</Button>
        </Card>
        </Col>

      </Row>
    </main>
  </div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'
import { Button, Table } from 'iview'
const fs = require('fs')
const path = require('path')
export default {
  name: 'landing-page',
  components: {
    SystemInformation,
    Button,
    Table
  },
  data() {
    return {
      tableData: [],
      valueList: [
        { index: 1, name: '123', size: 2 },
        { index: 2, name: '123', size: 2 }
      ],
      backgroundColor: 'rgba(255,255,255,0.8)',
      color2: '#e9d9ec',
      showFontModal: false,
      value5: `function (word, weight) {
            return (weight === 12) ? '#f02222' : '#c09292';}`,
      webFont: 'https://fonts.googleapis.com/css?family=Finger+Paint',
      fontyList: ['Finger Paint', 'Hiragino Mincho Pro', 'serif'],
      fontStyle: 'Hiragino Mincho Pro',
      switch1: true,
      randomFontColor: true, //随机颜色
      isSelectFile: false, //是否选择图片文件
      imgFileDate: '', //缩略图
      picWidth: 200, //画布宽度
      picHeight: 200, //画布高度
      imgData:'',
      fontSizeFactor: 0.1 //字体密度
    }
  },
  created: function(el) {
    console.log('aaaaaaaaaaa')
    this.$Message.config({
      top: 300,
      duration: 3
    })
  },
  mounted(){
     let option = this.$store.state.Counter.createOption
     let list = []
     console.log(option)
     if(option&&option.list){
       for(let i = 0;i<option.list.length;i++){
           list.push({
            name: option.list[i][0],
            index: i+1,
            size:option.list[i][1]
           })
     
       }
       
       this.valueList = list
     }
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link)
    },
    getValueListSize(size) {
      return `字体权重:${size}`
    },
    showFontModalEvent() {
      this.showFontModal = true
    },
    hideFontModalEvent() {
      this.showFontModal = false
    },
    change() {
      // this.randomFontColor = ! this.randomFontColor
    },
    addItem() {
      let newLength = this.valueList.length + 1
      this.valueList.push({
        index: newLength,
        size: 2,
        name: ''
      })
    },
    delectItem(index) {
      this.valueList.splice(index, 1)
    },
    clearFile() {
      console.log(this.$refs.imgFile.files)
      this.$refs.imgFile.value = ''
      this.isSelectFile = false
      this.imgFileDate = '' //缩略图
      console.log(this.$refs.imgFile.files)
    },
    selectFile() {
      // 选择了图片
      let getFile = this.$refs.imgFile.files[0]

      if(getFile.type){
        if (/^image/.test(getFile.type) === false) {
          this.$Message.warning('请选择图片格式')
          return
        }
      }else {
         this.$Message.warning('请选择图片格式')
        return
      }
      let that = this
      this.isSelectFile = true
      var reader = new FileReader()
      reader.readAsDataURL(this.$refs.imgFile.files[0])
      reader.onload = function(e) {
        that.imgFileDate = e.target.result
      }
    },
    createPic(){
      
      let createOption = {
        imageShape:this.imgFileDate,
        fontSizeFactor:this.fontSizeFactor,
         maxFontSize: 60,
         minFontSize:12,
         list:this.formattList(this.valueList),
         backgroundColor: this.backgroundColor,
         picWidth:this.picWidth + "px",
         picHeight:this.picHeight + "px"
      }
     
      this.$store.dispatch("saveOption",createOption)
      this.$router.push("create")
    },
    formattList(list){
      let newList = []
      list.forEach((item)=>{
         let name =  item.name.trim()
         newList.push([name,item.size])
      })
      return newList
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  padding: 30px 60px;
  width: 100vw;
  height: 100%;
}
.row-margin-top {
  margin-top: 2%;
}
.row-margin-bottom {
  margin-bottom: 2%;
}
.label-uploadimage {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 6px 15px;
  font-size: 12px;
  border-radius: 4px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear;
  color: #495060;
  background-color: #f7f7f7;
  border-color: #dddee1;
}
.color-red {
  color: red;
}
.padding {
  padding-left: 9px;
  padding-right: 9px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
</style>
