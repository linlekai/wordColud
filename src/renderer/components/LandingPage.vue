<template>
  <div id="wrapper">
    <main>
        <Row  :gutter="18">
          <Col :xs="{span:24}" :sm="{span:24}" :md="{span:24}" :lg="{span:12}" >
           <Card dis-hover	class="row-margin-bottom row-margin-top">
              <p slot="title"><span class="color-red">*&nbsp;</span>数据参数</p>
              <Form >
                <FormItem v-for="item in valueList" :key="item.index"   :label="'Item ' + item.index">
                <Row >
                  <Col :xs="{span:4}" :sm="{span:6}" :lg="{span:4}">
                      <Input type="text" v-model="item.name" placeholder="请输入内容"></Input>
                  </Col>
                  <Col :xs="{span:10}" :sm="{span:12}" :lg="{span:10}">
                      <Slider :tip-format="getValueListSize" v-model="item.size" :step="1" :min="1" :max="16" show-stops></Slider>
                  </Col>
                  <Col :xs="{span:4}" :sm="{span:4}" :lg="{span:4}">
                      <Button type="ghost" >删除</Button>
                  </Col>
                </Row>
                </FormItem>
              </Form>
                <Row >
                  <Col >
                        <Button type="dashed" long  icon="plus-round">Add item</Button>
                  </Col>
                </Row>
            </Card>
          </Col>
          <Col :xs="{span:24}" :sm="{span:24}" :lg="{span:12}">
            <Card dis-hover	class="row-margin-top">
              <p slot="title">画布设置</p>
              <Tooltip content="留空白使用0.65x的宽度" placement="top-start">
                <Row class-name="page-size-row" >
                  <Col span="12">画布宽度:
                    <InputNumber :max="1000" :min="200"></InputNumber>
                  </Col>
                  <Col span="12">画布高度:
                    <InputNumber :max="500" :min="100"></InputNumber>
                  </Col>              
                </Row>
              </Tooltip>
              <Tooltip placement="top-start" >
                <div slot="content" class="tooltip-content">
                  <span>调整像素密度显示权重</span>
                  <span>网格和画布像素大小</span>
                </div>
                <Row class-name="row-margin-top" >
                  <Col span="24">像素密度（dppx）:
                    <InputNumber :max="10" :min="1"></InputNumber>
                  </Col>
                </Row>
              </Tooltip>
            </Card>
            <Card dis-hover	class="row-margin-top">
              <p slot="title">导入图片</p>
              <p>
                <Icon type="information-circled"></Icon>
                <span>导入图片，根据图片内容轮廓生成对应的结构</span>
                <br>
                <label for="uploadimage" class="label-uploadimage row-margin-top" >
                  Upload image
                </label>
                <input type="file"  name="uploadimage" id="uploadimage" :style="{display:'none'}">
              </p>
            </Card>
          </Col>
          
       </Row>
    </main>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
import { Button, Table } from "iview";
const fs = require("fs");
const path = require("path");
export default {
  name: "landing-page",
  components: {
    SystemInformation,
    Button,
    Table
  },
  data() {
    return {
      dictorySelected: "", //文件路径
      isLoading: false, //导入图片控制位
      tableData: [],
      valueList: [{ index: 1, name: "123", size: 2 },{ index: 2, name: "123", size: 2 }],
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    getValueListSize(size){
       return `字体权重:${size}`
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 30px 60px;
  width: 100vw;
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
</style>
