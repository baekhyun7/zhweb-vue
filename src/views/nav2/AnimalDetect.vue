<template>
  <div>
    <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in dataimg" :key="item.id">
        <el-col >
          <img style="float: left;" :src="item.idView">
              <span>{{item.txt2}}</span>
        </el-col>
    </el-carousel-item>
  </el-carousel>
    <div style="text-align:center">
      <h3>动物识别介绍：<br>这个模块是当你对自己所持图片不能确定时，您可以在此窗口用来识别</h3>
      <br><br><br><br>
      <el-upload ref="upload"
  class="upload-demo"
  drag
  :action="actionurl"
  :http-request="uploadimg"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

<el-button  size="small" type="primary" @click="clear">清除文件</el-button>
    </div>
    

<el-dialog title="识别结果" :visible.sync="dialogTableVisible">
  <el-table :data="responseData">
    <el-table-column property="baikeInfo.description" show-overflow-tooltip label="百度信息" width="200"></el-table-column>
    <el-table-column property="name" show-overflow-tooltip label="名称" width="200"></el-table-column>
    <el-table-column property="score" show-overflow-tooltip label="识别概率" width="250"></el-table-column>
  </el-table>
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
         dialogTableVisible: false,
         actionurl: "",
         message: "",
         responseData: [],
         dataimg: [{
           id: 1,
           idView: require('../../assets/picture/animal/哈士奇1.jpg'),
           txt2: '哈士奇'
         },{
           id: 2,
           idView: require('../../assets/picture/animal/熊猫1.jpg'),
           txt2: '熊猫'
         },{
           id: 3,
           idView: require('../../assets/picture/animal/狮子1.jpg'),
           txt2: '狮子'
         },{
           id: 4,
           idView: require('../../assets/picture/animal/豹子1.jpg'),
           txt2: '豹子'
         },{
           id: 5,
           idView: require('../../assets/picture/animal/马1.jpg'),
           txt2: '马'
         }]
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
        axios.post("http://localhost:8081/thingsIdentify/animalDetect",form).then(res=>{
          console.log('form',res.data)
          if(res.data.code == 200){
            this.dialogTableVisible=true;
            this.responseData = res.data.data;
          }else{
            this.dialogTableVisible=false;
            alert("识别失败")
          }
        }).catch(e => {
          this.$notify.warning('服务器繁忙')
        })

      },
      clear(){
        this.$refs.upload.clearFiles();
      }
    }
  }

</script>