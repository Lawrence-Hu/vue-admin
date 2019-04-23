<template>
    <div>
        <template>
            <el-table
            :data="tableData"
            border
            style="width: 100%;margin-left:3%">
               <el-table-column
            prop="date"
            label="用户Id"
            width="300">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="200">
            </el-table-column>
            <el-table-column
            prop="date"
            label="日期"
            width="200">
            </el-table-column> 
            <el-table-column
            prop="address"
            label="备注">
            </el-table-column>
            <el-table-column
            prop="address"
            label="详情">
            <template slot-scope="scope">
                <el-button
                size="medium"
                @click="handleEdit(scope.$index, scope.row)">详情</el-button>    
                <el-button
                :type="scope.row.tag === '已通过' ? 'success' : 'danger'" size="medium"
                :disabled="true">{{scope.row.tag}}</el-button>
            </template>      
            </el-table-column>
        </el-table>
    </template>
    <el-dialog title="用户认证" :visible.sync="dialogFormVisible">
        <el-form :model="form" :inline="true">
            <div class="block" style="width:58%;float:right" >
                <el-carousel trigger="click" height="250px" >
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3>{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <el-form-item label="认证Id" label-width="68px">
                <el-input :disabled="true" v-model="form.name"></el-input>
            </el-form-item>
           <el-form-item label="姓名" label-width="68px">
                <el-input  :disabled="true" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input :disabled="true" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="当前住址">
                <el-input :disabled="true" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="信息">
                <el-input type="textarea" style ="width:250%;height:400%" :disabled="true" v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>
<script>
export default {
     data() {
      return {
        dialogFormVisible:false,
        formLabelWidth: '120px',
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag:'已通过',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag:'已通过',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag:'已通过',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag:'已驳回',
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible=true
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>
<style scoped>
  .el-input__inner{
      height:43px;
      width: 120%;
  }
 .el-textarea__inner{
     padding:15px 15px;
     height: 80px;
 }  
</style>

