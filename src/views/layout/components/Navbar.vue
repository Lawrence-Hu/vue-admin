<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-button type="primary" @click="startRecording" icon="el-icon-microphone" style=" float:right;margin-right:120px;margin-top: 5px;" circle></el-button>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            控制台
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="loginout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog 
      width="20%"
      customClass="customWidth"
      :visible.sync="dialogVisible"
      >
    <img @click="stopRecording" style="width:260px;height:260px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559240142375&di=097d9ec65ebf675866fa2426eefadaca&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160920%2F824775f9c4814616ae84c9751cbef8b7_th.jpg" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {logout} from '@/api/login'
import {recorder} from '../../../utils/recoder';
import {uploadMedia} from '../../../api/product'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data(){
      return{
        isRecording :false,
        blob : null,
        audioContext:null,
        recorder:null,
        dialogVisible:false
      }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    loginout() {
      logout().then((resp)=>{
        this.$router.push({ path: this.redirect || '/login' })
      })
    },
    startRecording() {
     this.dialogVisible = true
      recorder(window),
      HZRecorder.get((rec)=>{
        this.recorder = rec;
        this.recorder.start();
      })
    },
    stopRecording() {
      var audio = document.querySelector('audio');
      this.recorder.stop()
      let param = new FormData(); //创建form对象
      console.log(this.recorder.getBlob())
      param.append('blob',this.recorder.getBlob());//通过append向form对象添加数据
      uploadMedia(param).then((resp)=>{
        alert(JSON.stringify(resp.data))
        this.$router.push({ path: this.redirect || '/user/info' })
      })
      this.dialogVisible= false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

