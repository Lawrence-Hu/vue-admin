<template>
<div>
    <div>
     <div class="search" style="margin-top: 15px;width:30%;float:right;margin-right:11%">
      <el-input v-model="input" style="width:75%;" placeholder="请输入内容"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <template>
        <el-table
            :data="data"
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户姓名">
                    <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="手机号码">
                    <span>{{ props.row.phone==null|| props.row.phone==''?'用户未绑定手机号':props.row.phone}}</span>
                </el-form-item>
                <el-form-item label="邮箱地址">
                    <span>{{ props.row.email==null|| props.row.email==''?'用户未绑定邮箱':props.row.email }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                    <span>{{ props.row.createdTime }}</span>
                </el-form-item>
                <el-form-item label="最近登录">
                    <span>{{ props.row.lastLoginTime }}</span>
                </el-form-item>
                <el-form-item label="账号状态">
                    <span >{{ props.row.userStatus.statusName}}</span>
                </el-form-item>
                <el-form-item label="用户角色">
                     <span v-for="item in props.row.roles" :key="item.identity">{{item.identity +"   " }}  </span>
                </el-form-item>
                  <el-form-item label="用户地址">
                    <span>{{ props.row.address }}</span>
                </el-form-item>
                  <el-form-item label="支付宝账号">
                    <span>{{ props.row.alipayAccount==null|| props.row.alipayAccount==''?'用户未提供支付宝':props.row.alipayAccount }}</span>
                </el-form-item>
                <el-form-item label="是否实名"> 
                    <span>{{ props.row.certification==0?'未实名':'已实名' }}</span>
                </el-form-item>
                </el-form>
            </template>
            </el-table-column>
              <el-table-column
            label="用户账号"    
            prop="account">
            </el-table-column>
            <el-table-column
            label="用户名称"
            prop="name">
            </el-table-column>
            <el-table-column
            label="用户地址"    
            prop="address">
            </el-table-column>
           <el-table-column
            label="创建时间"    
            prop="createdTime">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="success" plain
                  icon="el-icon-edit"
                  @click="change(scope.row.id)">解除状态</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageNum"  class="pagination">
        </el-pagination>
    </template>
  </div>
</div>
</template>
<style scoped>
  .search {
    display: flex;
    justify-content: space-around
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .pagination{
    float:right;
    margin-right: 5%;
    margin-top: 32%
  }
  .el-form--inline .el-form-item{
      padding-right: 8%;
  } 
</style>

<script>
   import {allUsers,changeStatus,frozenUsers} from "@/api/user"
  // axios.defaults.withCredentials=true
  export default {
    data() {
      return {
        data:[],   
        input:'',
        pageNum:12,
        show:true,
        dialogFormVisible: false,
        form: {},
        formLabelWidth: '120px'
      }
    },
  beforeMount:function(){
      this.$store.dispatch('GetInfo').then(() => {
      }).catch(()=>{
        this.$router.push({ path: this.redirect || '/login' })
      })
  },
  mounted:function(){
      frozenUsers(20,1).then((resp)=>{
        this.data=resp.data.records
      }).catch((error)=>{  
        if(error.code===201){
          this.$router.push('/login')
        }
      })
    },
    methods: {
      detail(scope){
        this.form=JSON.parse(JSON.stringify(scope))
        this.dialogFormVisible=true;
      },
    change(id){
      this.$confirm('确认修改用户状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning', 
          beforeClose:(action,instance,done)=>{
            if(action==='confirm'){
              changeStatus(id).then(()=>{
                setTimeout(()=>{
                done();
                location.reload()
                },1000)
              }).
              catch((error)=>{
                done()
              })             
            }else{
              done()  
            }
          }
        }).catch(()=>{
          this.$message({
          type: 'error',
          message: '用户取消操作'
          });
        })
    }
    }
  }
</script>
