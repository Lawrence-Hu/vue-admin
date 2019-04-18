<template>
    <div>
    <template>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="Id"
            width="250">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="400">
            </el-table-column>
            <el-table-column
            prop="address"
            label="角色">
            </el-table-column>
            <el-table-column
            prop="address"
            label="备注">
            </el-table-column>
            <el-table-column
            label="管理">
             <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary" size="medium">分配角色</el-button>
                <el-button type="success" class="manage" size="medium" >删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </template>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :inline=true :model="form">
         <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
         >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="Id"
              width="140">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="角色名称"
              width="240">
            </el-table-column>
            <el-table-column
              prop="address"
              label="备注"
              show-overflow-tooltip>
            </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        dialogTableVisible: false,
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
    methods:{
      handleClick(row){
        console.log(row)
        this.dialogFormVisible=true
      }
    }
}
</script>
<style>

</style>
