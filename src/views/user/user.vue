<template>
<div>
    <div>
     <div class="search" style="margin-top: 15px;width:30%;float:right;margin-right:11%">
      <el-input v-model="input" style="width:75%;" placeholder="请输入内容"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <template>
        <el-table
            :data="data.records"
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
                    <span  >{{ props.row.userStatus.statusName }}</span>
                </el-form-item>
                <el-form-item label="用户角色">
                     <span v-for="role in props.row.roles" :key="role.id" >{{ role.identity+"   "}}</span>
                </el-form-item>
                  <el-form-item label="用户地址">
                    <span>{{ props.row.address }}</span>
                </el-form-item>
                  <el-form-item label="支付宝账号">
                    <span>{{ props.row.alipayAccount==null|| props.row.alipayAccount==''?'用户未提供支付宝':props.row.alipayAccount }}</span>
                </el-form-item>
                <el-form-item label="是否实名"> 
                    <span>{{ props.row.certification==true?'已实名':'未实名' }}</span>
                </el-form-item>
                  <el-button type="text" @click="detail(props.row)">修改用户信息</el-button>
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
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageNum"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="pageChange"
            class="pagination">
        </el-pagination>
        <!-- Form -->
        <el-dialog title="用户信息修改" :visible.sync="dialogFormVisible" width="850px" >
        <el-form :inline="true" :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth" style="margin-right:3%">
                <el-input v-model="form.name" auto-complete="off"  style="width:109%"></el-input>
            </el-form-item>
          
            <el-form-item label="邮箱号" :label-width="formLabelWidth" style="">
                <el-input v-model="form.email" :value="form.email" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>
            
            <el-form-item label="手机号" :label-width="formLabelWidth" style="margin-right:3%">
                <el-input  v-model="form.phone" :placeholder="form.phone==''?'用户未绑定手机号':form.phone" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>

            <el-form-item label="支付宝账号" :label-width="formLabelWidth" style="">
                <el-input v-model="form.alipayAccount" :placeholder="form.alipayAccount==''?'用户未提供支付宝账号':form.alipayAccount"  auto-complete="off" style="width:109%"></el-input>
            </el-form-item>
            
            <el-form-item label="是否实名" :label-width="formLabelWidth" style="">
                <el-select v-model="form.certification" >
                <el-option label="未实名" :value="false"></el-option>
                <el-option label="已实名" :value="true"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用户状态" :label-width="formLabelWidth" style="padding-right:1%">
                <el-select v-model="form.status" >
                  <div v-for="status in data.statuses" :key="status.id">
                     <el-option :label="status.statusName" :value="status.id"></el-option>
                  </div>  
                </el-select>
            </el-form-item>

            <el-form-item label="用户地址" :label-width="formLabelWidth"  style="">
                 <el-input v-model="form.address" :placeholder="form.address==''?'用户未提供地址':form.address" style="width:109%"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="clear:both;margin-right:12%">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
        </el-dialog>
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
  import {allUsers,updateUser} from "@/api/user"
  export default {
    data() {
      return {
        data:[],   
        input:'',
        currentPage:1,
        pageSize:1,
        pageNum:null,
        row:null,
        show:true,
        dialogFormVisible: false,
        form: {},
        formLabelWidth: '120px'
      }
    },
    created:function(){
        this.pageChange(1)
        this.$store.dispatch('GetInfo').then(() => {
        }).catch(()=>{
          this.$router.push({ path: this.redirect || '/login' })
        })
    },
    methods: {
      detail(scope){
        this.row=scope
        this.form=JSON.parse(JSON.stringify(scope))
        this.dialogFormVisible=true;
      },
      pageChange(num){
        allUsers(this.pageSize,num).then((resp)=>{
          this.pageNum = resp.data.pages
          this.data=resp.data
        }).catch((error)=>{  
          if(error.code===201){
            this.$router.push('/login')
          }
        })
      },
      submit() {
        this.$confirm('此操作将会对用户产生永久性影响, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose:(action,instance,done)=>{
            if(action==='confirm'){
              updateUser(this.form).then(()=>{
                   for (const key in this.form) {
                      this.row[key] = this.form[key]
                    }
                    this.dialogFormVisible = false
                 done()
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
      },
    }
  }
</script>
