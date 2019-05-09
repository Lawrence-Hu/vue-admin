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
                <el-button @click="detail(scope.row)" type="primary" size="small">查看详情</el-button>
                <el-button type="success" class="manage" @click="role(scope.row)" size="small" >分配角色</el-button>
            </template>
            </el-table-column>
        </el-table>
    </template>
    <el-dialog :title=dialogTitle :visible.sync="dialogFormVisible">
      <el-form :inline=true>
         <el-table
          ref="multipleTable"
          :data="roles"
          tooltip-effect="dark"
          style="width: 100%"
          :height="height"
          @select="selectItem"
         > 
         <el-table-column
              v-if="select"
              type="selection"
              width="40">
            </el-table-column>
            <el-table-column
              prop="identity"
              label="角色名称"
              width="100">
            </el-table-column>
            <el-table-column
              prop="description"
              label="角色描述"
               width="400"
              show-overflow-tooltip>
            </el-table-column>
              <el-table-column
              prop="created_time"
              label="创建时间"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              width="120"
              label="查看角色权限" 
              show-overflow-tooltip
               type="expand">
              <template slot-scope="scope">
                    <el-table
                      :data="scope.row.permissions"
                      style=" margin-left:12%;width: 100%">
                      <el-table-column
                        prop="name"   
                        label="权限名称"                  
                        width="400">
                      </el-table-column>
                      <el-table-column
                        label="权限描述"               
                        prop="description"
                        width="180">
                      </el-table-column>
                    </el-table>
              </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" v-if="select" class="dialog-footer">
        <el-button style="margin-right:50px;margin-bottom:20px" @click="comfirm()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
 import { allUserByRoles,getRoles,getAllRoles } from "@/api/user";
export default {
    data() {
      return {
        users: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        roles: [],
        select:false,
        height:'',
        dialogTitle:'',
        userId:null,
        selection:null,
        permissions:[],
        formLabelWidth: '120px',
        aaa:function(a,b){
          alert("aaa")
        }
      }
    },
    mounted:function(){
          allUserByRoles(2,1).then((resp)=>{
          this.users = resp.data.users
        
        })
    },
    methods:{
      detail(row){
        this.select=false
        this.height="380px";
        this.dialogTitle=row.name+'拥有的角色'
        getRoles(row.id).then((resp)=>{
          this.roles = resp.data
        })
        this.dialogFormVisible=true
      },
      role(row){
        this.select=true
        this.height="300px";
        this.userId=row.id
        this.dialogTitle=row.name+''
        getAllRoles().then((resp)=>{
          this.roles = resp.data
        })
        this.dialogFormVisible=true
      },
      selectItem(selection){
        this.selection = selection
      },
      comfirm(){
        let roleIds = [];
        for(var i=0;i<this.selection.length;i++){
            roleIds.push(this.selection[i].id)
        }
        var params = {
          roleIds:roleIds,
          user_id:this.userId
        }
        console.log(params)
    }
    },
}
</script>
<style>

</style>
