<template>
  <div id="wrapper">
    <main>
        <Row  :gutter="18">
          <Col span="12">
            <Card dis-hover	>
              <p slot="title">画布设置</p>
              <Tooltip content="留空白使用0.65x的宽度" placement="top-start">
                <Row class-name="page-size-row" :gutter="32" >
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
                <Row class-name="row-margin">
                  <Col span="24">像素密度（dppx）:
                    <InputNumber :max="10" :min="1"></InputNumber>
                  </Col>
                </Row>
              </Tooltip>
            </Card>
          </Col>
          <Col span="12">
            <Card dis-hover	>
              <p slot="title">导入图片</p>
            </Card>
          </Col>
       </Row>
      <!-- <div class="left-side">
        <span class="title">
          Welcome to your new project!
        </span>
      </div> -->

      <!-- <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
          <button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>
        </div>
      </div> -->
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
import { Button, Table } from 'iview';
  export default {
    name: 'landing-page',
    components: { SystemInformation ,
      Button,
      Table
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
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

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 30px 60px;
    width: 100vw;
  }
  .row-margin {
    margin-top:2%;
  }



</style>
