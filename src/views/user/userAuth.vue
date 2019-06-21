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
                <el-button type="success" class="manage" @click="allRoles(scope.row)" size="small" >分配角色</el-button>
            </template>
            </el-table-column>
        </el-table>
    </template> 
        <!--分页-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageNum"
        :page-size="pageSize"
        @current-change="pageChange"
        class="pagination">
      </el-pagination>

    <el-dialog :title=dialogTitle :visible.sync="dialogFormVisible">
      <el-form :inline=true>
         <el-table
          ref="multipleTable"
          :data="roles"
          tooltip-effect="dark"
          style="width: 100%"
          height=300px
          @selection-change="selectItem"
         > 
         <el-table-column
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
               width="280"
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
                      style=" margin-left:14%;width: 100%">
                      <el-table-column
                        prop="name"   
                        label="权限名称"                  
                        width="280">
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
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-bottom:10px" @click="dialogFormVisible = false">取消</el-button>
        <el-button style="margin-right:50px;margin-bottom:10px" @click="confirm()" type="primary">{{ submit=="del"?'删除所选角色':'分配所选角色'}}</el-button>
      </div>
    </el-dialog>

    </div>
</template>
<script>
import { allUsers,getRoles,getAllRoles,asignUserRole,deleteUserRole } from "@/api/user";
import { Message } from 'element-ui'
export default {
    data() {
      return {
        users: [],
        dialogFormVisible: false,
        roles: [],
        submit:null,
        dialogTitle:'',
        userId:null,
        pageSize:1,
        pageNum:null,
        selection:null,
        permissions:[],
        formLabelWidth: '120px',
      }
    },
    mounted:function(){
          this.pageChange(1) 
    },
    methods:{
      pageChange(curtpage){
           //获取用户
          allUsers(this.pageSize,curtpage).then((resp)=>{
           this.users = resp.data.records
           this.pageNum = resp.data.pages
        })
      },
      async detail(row){
        this.selection=null
        this.submit="del"
        this.userId=row.id
        this.dialogTitle=row.name+'拥有的角色'
        try{
            let resp = await getRoles(row.id)
            this.roles = resp.data
            this.dialogFormVisible=true
        }catch(err){
            this.dialogFormVisible=false
        } 
      },
     async allRoles(row){
        this.selection=null
        this.submit="asign"
        this.userId=row.id
        this.dialogTitle='给'+row.name+'分配角色'
        console.log(row)
        let resp = await getAllRoles()
        this.roles = resp.data
        this.dialogFormVisible=true
      },
      selectItem(selection){
        this.selection = selection
      },
    
      async confirm(){
        if(this.selection==null||this.selection.length==0){
             Message({
                message: "您还没有选择角色呢！",
                type  : 'warning',
                duration: 3 * 1000
              }) 
              return
        }
        //数据封装
        let roleIds = [];
        for(var i=0;i<this.selection.length;i++){
            roleIds.push(this.selection[i].id)
        }
        var params = {
          roleIds:roleIds,
          user_id:this.userId
        }

        if(this.submit=='del'){
          await deleteUserRole(params)
          try{
              let resp = await getRoles(this.userId)
              this.roles = resp.data 
          }catch(err){
              this.dialogFormVisible = false
          }    
        }else if(this.submit=="asign"){
          asignUserRole(params).catch(err=>{})
          this.dialogFormVisible=false
        }
    },
    },
}
</script>
<style scoped>
  .pagination {
    float:right;
    margin-right: 5%;
    margin-top: 38%
  }
</style>
