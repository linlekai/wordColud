<template>
  <div id="app">
     <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed',top:0,zIndex:10, width: '100%'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                        <router-link class="app-header" to="/">
                            <Icon type="ios-settings"></Icon>
                           设置
                        </router-link>
                        </MenuItem>
                        <MenuItem class="app-header" name="2">
                          <router-link to="/create">
                            <Icon type="ios-eye"></Icon>
                            视图
                          </router-link>
                        </MenuItem>
                        <MenuItem class="app-header" name="3">
                            <Icon type="ios-book"></Icon>
                           指南
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <div class="appview">
              <router-view>
                <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
                  Content
                </Content>
              </router-view>
            </div>            
        </Layout>
    </div>
   
  </div>
</template>

<script>

  export default {
    name: 'wordcolud'
  }
</script>

<style>
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
  }
  .layout-logo{
      width: 100px;
      height: 50px;
      background: #5b6270;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 8px;
      left: 5px;
      background-image: url("./assets/colud-icon.jpeg");
      background-position: 50%;
    background-size: 135%;
  }
  .layout-nav{
      width: 420px;
      margin: 0 auto;
      margin-right: 20px;
  }
  .layout-footer-center{
      text-align: center;
  }
  .appview {
    margin-top: 5%;
  }
  .layout  .ivu-menu-item {
    color: #eee;
  }
  .router-link-active{
    color: #fff !important;
  }
   .app-header > a{
    color: #999;
  }
</style>
