<template>
<div>
    <div>
     <div class="search" style="margin-top: 15px;width:30%;float:right;margin-right:11%">
      <el-input v-model="input" style="width:75%;" placeholder="请输入内容"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <template>
        <el-table
            :data="data.tableData5"
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
                    <span>{{ props.row.createTime }}</span>
                </el-form-item>
                <el-form-item label="最近登录">
                    <span>{{ props.row.lastLoginTime }}</span>
                </el-form-item>
                <el-form-item label="账号状态">
                    <span v-for="status in data.statuses" :key="status.id" >{{ props.row.status==status.id?status.name:"" }}</span>
                </el-form-item>
                <el-form-item label="用户权限">
                    <span>{{ props.row.authen }}</span>
                </el-form-item>
                  <el-form-item label="用户地址">
                    <span>{{ props.row.address }}</span>
                </el-form-item>
                  <el-form-item label="支付宝账号">
                    <span>{{ props.row.alipayAcc==null|| props.row.alipayAcc==''?'用户未提供支付宝':props.row.alipayAcc }}</span>
                </el-form-item>
                <el-form-item label="是否实名">
                    <span>{{ props.row.isAuthName==0?'未实名':'已实名' }}</span>
                </el-form-item>
                  <el-button type="text" @click="detail(props.row)">修改用户信息</el-button>
                </el-form>
            </template>
            </el-table-column>
            <el-table-column
            label="用户ID"
            prop="id">
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
            prop="createTime">
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageNum"  class="pagination">
        </el-pagination>
        <!-- Form -->
        <el-dialog title="用户信息修改" :visible.sync="dialogFormVisible">
        <el-form :inline="true" :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth" style="margin-right:3%">
                <el-input v-model="form.name" auto-complete="off"  style="width:109%"></el-input>
            </el-form-item>
          
            <el-form-item label="邮箱号" :label-width="formLabelWidth" style="">
                <el-input :value="form.email==null||form.email==''?'用户未绑定邮箱':form.email" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>
            
            <el-form-item label="手机号" :label-width="formLabelWidth" style="margin-right:3%">
                <el-input :value="form.phone==null||form.phone==''?'用户未绑定手机号':form.phone" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>

            <el-form-item label="支付宝账号" :label-width="formLabelWidth" style="">
                <el-input :value="form.alipayAcc==null||form.alipayAcc==''?'用户未提供支付宝账号':form.alipayAcc"  auto-complete="off" style="width:109%"></el-input>
            </el-form-item>
            
            <el-form-item label="是否实名" :label-width="formLabelWidth" style="">
                <el-select v-model="form.isAuthName" placeholder="请选择活动区域">
                <el-option label="未实名" value="0"></el-option>
                <el-option label="已实名" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用户状态" :label-width="formLabelWidth" style="padding-right:1%">
                <el-select v-model="form.status" placeholder="请选择活动区域">
                  <el-option v-for="status in data.statuses" :key="status.id"  :label="status.name" :value="status.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用户地址" :label-width="formLabelWidth"  style="">
                 <el-input v-model="form.address"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="clear:both;margin-right:12%">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="open2">确 定</el-button>
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
  export default {
    data() {
      return {
        data:{
           tableData5: [{
          id: '12987122',
          name:'胡超',
          phone: '',
          email: '1396953791@qq.com',
          createTime:'2018/05/02 12:15',
          lastLoginTime:'2018/05/02 12:15',
          status: '1',
          authen:'超级管理员',
          alipayAcc:'',
          account:'是打算离开家',
          isAuthName:'0',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        statuses:[{id:'1',name:"冻结"},{id:'2',name:"正常"}]
        },
       
        input:'',
        pageNum:12,
        show:true,
        phtenvir:false,
        dialogFormVisible: false,
        form: {
          name: '',
          phone:'',
          emial:'',
          address:'',
          alipayAcc:'',
          isAuthName:''
        },
        formLabelWidth: '120px'
      }
    },
    mounted: function(){
		//可用于设置自适应屏幕，根据获得的可视宽度（兼容性）判断是否显示
		let w = document.documentElement.offsetWidth || document.body.offsetWidth;
      if(w < 1000){
        this.show = false;
        this.phtenvir =true;
      }
    },
    methods: {
      detail(scope){
        this.form=JSON.parse(JSON.stringify(scope))
        this.dialogFormVisible=true;
      },
      open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
         this.dialogFormVisible=false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        }); 
      },
      detailforMobile(item){
        this.show=true
        this.form=JSON.parse(JSON.stringify(item));
        console.log(this.phone)
      }
    }
  }
</script>
