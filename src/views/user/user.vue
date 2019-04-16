<template>
    <div>
        <template>
            <el-table
                :data="tableData5"
                style="width: 100%">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="用户姓名">
                        <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱地址">
                        <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <span>{{ props.row.shopId }}</span>
                    </el-form-item>
                    <el-form-item label="最近登录">
                        <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="账号状态">
                        <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="用户权限">
                        <span>{{ props.row.desc }}</span>
                    </el-form-item>
                      <el-form-item label="用户地址">
                        <span>{{ props.row.desc }}</span>
                    </el-form-item>
                      <el-form-item label="支付宝账号">
                        <span>{{ props.row.desc }}</span>
                    </el-form-item>
                    <el-form-item label="是否实名">
                        <span>{{ props.row.desc }}</span>
                    </el-form-item>
                     <el-button type="text" @click="dialogFormVisible = true">修改用户信息</el-button>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column
                label="用户ID"
                prop="id">
                </el-table-column>
                <el-table-column
                label="用户名称"
                prop="name">
                </el-table-column>
                <el-table-column
                label="用户默认收货地址"    
                prop="desc">
                </el-table-column>
              <el-table-column
                label="用户状态"    
                prop="desc">
                </el-table-column>
            </el-table>
            <!-- Form -->
            <el-dialog title="用户信息修改" :visible.sync="dialogFormVisible">
            <el-form :inline="true" :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth" style="">
                    <el-input v-model="form.name" auto-complete="off" ></el-input>
                </el-form-item>
              
                <el-form-item label="邮箱号" :label-width="formLabelWidth" style="float:right;margin-right:12%">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="手机号" :label-width="formLabelWidth" style="">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="支付宝账号" :label-width="formLabelWidth" style="float:right;margin-right:12%">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="是否实名" :label-width="formLabelWidth" style="">
                   <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="用户状态" :label-width="formLabelWidth" style="float:right; margin-right:12%">
                   <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="用户地址" :label-width="formLabelWidth"  style="">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="open2">确 定</el-button>
            </div>
            </el-dialog>
    
        </template>
    </div>
</template>
<style>
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
</style>

<script>
  export default {
    data() {
      return {
        tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
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
       
      }
    }
  }
</script>
