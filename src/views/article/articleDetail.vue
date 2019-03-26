<template>
  <div id="article">
    <div id="edit-article" v-show="show">
      <div class>
        <label for="article-title">标题：</label>
        <input id="article-title" placeholder="请输入标题" type="text" v-model="articleReq.title">
      </div>
      <mavon-editor class="editor"  v-model="articleReq.content"/>
      <button @click="submit()">提交</button>
    </div>

    <div id="article-page" v-show="!show">
      <div class="panel panel-info">
        <div class="panel-heading">
          <h1 class="titletitle" style="text-align:center;color:red">{{article.title}}</h1>
          <div style="text-align:center">
            作者：{{article.createdUsername}}
            <span id="created-time">时间：{{getCreatedTime}}</span>
          </div>
        </div>
        <div class="panel-body" v-html="getContent"></div>
        <div class="panel-footer" style="text-align:center;">
          <span class="foot-item">
            <i :class="['iconfont','icon-dianzan',{praised: praised}]" @click="click()"></i>
            {{article.praiseClicks}}
          </span>
          <span class="foot-item">
            <span class="foot-item">阅读量：{{article.readingAmount}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { getParsedTime } from "../../api/index";
//import {api, getApi, http, resCode} from "@/assets/js/api";
import mavonEditor from "mavon-editor";
import { getArticleShowById,addArticle,readingAmountAddOne,praiseClicksAddOne } from "../../api/api";

export default {
  data() {
    return {
        articleReq:{
        title: "",
        content: "",
        createdUserId: "",
        },
      article: {
        id: "",
        title: "",
        content: "",
        createdUsername: "",
        createTime: 0,
        praiseClicks: 0,
        readingAmount: 0
      },
      //todo 暂定为可重复点赞，防止重复点赞时请设定为true
      praised: false,
      
      getArticleCommentRo: {
        articleId: "",
        queryPage: {
          pageNum: 1,
          pageSize: 20
        }
      },
      articleCommentList: [],
      articleTest:{id:""},
      show: true
    };
  },
  computed: {
    getContent() {
      return mavonEditor.markdownIt.render(this.article.content);
    },
    getCreatedTime() {
      return getParsedTime(this.article.createTime);
    }
  },
  methods: {
      click(){
          if (this.praised) {
                    return;
                }
        this.praised = true;
          this.article.praiseClicks=this.article.praiseClicks+1
          let param= {id:this.article.id}
          praiseClicksAddOne(param).then(res=>{
          })
      },
    getEditOrShow() {
      this.show = this.$route.query.edit;
    },
    submit(){
        this.articleReq.createdUserId =JSON.parse(localStorage.getItem('user')).id;
        addArticle(this.articleReq).then(res=>{
        })
        
    },
    getArticle() {
      let param = { id: this.$route.query.articleId };
      this.show = this.$route.query.edit;
      if(!this.show){
        getArticleShowById(param).then(res => {
        this.article = res.data.data;
      });
      }
    },
    
    getCommentTime(timestamp) {
      return getParsedTime(timestamp);
    }
  },
  created() {
    this.getEditOrShow();
     this.getArticle();
    
    
    // this.getArticleComment();
  }
};
</script>

<style lang="scss"  scoped>
.panel {
  margin-top: 56px;
}
.titletitle{
  color: red;
}
.panel-footer {
  text-align: right;
}
#created-time {
  margin-left: 5px;
}
#comment-textarea {
  resize: none;
}
.list-group {
  margin-top: 5px;
}
.foot-item {
  margin-left: 5px;
  margin-right: 5px;
}
.comment-foot {
  text-align: right;
}
.comment-foot-item-group {
  border-style: solid;
  border-width: 1px;
  border-radius: 10%;
}
