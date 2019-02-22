<template>
  <div>
    <h3>通用物体识别介绍：</h3>
    <el-upload
  class="upload-demo"
  drag
  :action="xxx"
  :http-request="uploadimg"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
  
  
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { advancedGeneral } from '../../api/api';
  import axios from 'axios';

  export default {
    data(){
      return {
         dialogVisible: false,
         msg: "",
         uploadurl: "http://localhost:8081/thingsIdentify/advancedGeneral",
         
      };
    },
    computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
    },
    methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      uploadimg(fileObject){
        let form = new FormData() // 创建form对象
      form.append('file', fileObject.file)
        axios.post("http://localhost:8081/thingsIdentify/advancedGeneral",form).then(res=>{
          console.log('form')
        })

      }
    }
  }

</script>