<template>
    <div>
    <template>
        <el-table
            :data="users"
            border
            style="width: 100%">
            <el-table-column
            prop="account"
            label="ID"
            width="250">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="250">
            </el-table-column>
            <el-table-column
            label="角色">
            <template slot-scope="scope" > <span v-for="item in scope.row.roles" :key="item.id">{{item.identity+'  '}}</span></template>
            </el-table-column>
            <el-table-column
            prop="createdTime"
            label="角色描述">
            </el-table-column>
            <el-table-column
            label="管理">
             <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary" size="small">分配角色</el-button>
                <el-button type="success" class="manage" size="medium" >detail</el-button>
            </template>
            </el-table-column>
        </el-table>
    </template>
    <el-dialog :title=dialogTitle :visible.sync="dialogFormVisible">
      <el-form :inline=true :model="form">
         <el-table
          ref="multipleTable"
          :data="roles"
          tooltip-effect="dark"
          style="width: 100%"
          height="300px"
         > 
         <el-table-column
              type="selection"
              width="100">
            </el-table-column>
            <el-table-column
              prop="identity"
              label="角色名称"
              width="140">
            </el-table-column>
            <el-table-column
              prop="description"
              label="角色描述"
              show-overflow-tooltip>
            </el-table-column>
              <el-table-column
              prop="created_time"
              label="创建时间"
              show-overflow-tooltip>
            </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-right:20px;margin-bottom:20px" @click="dialogFormVisible = false">取 消</el-button>
        <el-button style="margin-right:50px;margin-bottom:20px" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
 import { allUserByRoles,getRoles } from "@/api/user";
export default {
    data() {
      return {
        users: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        roles: [],
        dialogTitle:'',
        form:{
        },
        formLabelWidth: '120px'
      }
    },
    mounted:function(){
          allUserByRoles(2,1).then((resp)=>{
          this.users = resp.data.users
        
        })
    },
    methods:{
      handleClick(row){
        this.dialogTitle=row.name+''
        getRoles(row.id).then((resp)=>{
         console.log(resp.data)
          this.roles = resp.data
        })
        this.dialogFormVisible=true
      }
    }
}
</script>
<style>

</style>
