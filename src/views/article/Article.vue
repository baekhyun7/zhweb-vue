<template>
  <div>
    <div class="div_top">
      <el-card class="box-card">
      </el-card>
      <router-link :to="{ path: '/articleDetail', query: { edit: true }}">
                <button>发表文章</button>
              </router-link>
      </div>
    <div class="div_card">
      <el-row>
        <el-col :span="16" v-for="article in articleList" :key="article.id">
          <el-card :body-style="{ padding: '12px' }">
            <div style="padding: 14px;">
              <router-link :to="{ path: '/articleDetail', query: { articleId: article.id,edit: false }}">
                <h2 class="post-title">{{article.title}}</h2>
              </router-link>
              <div class="bottom clearfix">
                <p class="post-meta">
                  {{article.createdUsername}}
                  发表于{{getParsedTime(article.createTime)}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i
                    class="iconfont icon-dianzan"
                  ></i>
                  {{article.praiseClicks}}
                  <span>阅读量：{{article.readingAmount}}</span>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!--工具条-->
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
    </div>
  </div>
</template>

<script>
import util from "../../common/js/util";
import { mavonEditor } from "mavon-editor";
import { getParsedTime } from "../../api/index";
//import NProgress from 'nprogress'
import { getArticleShowList } from "../../api/api";
import "../../styles/style-ali/iconfont.css";
export default {
  data() {
    return {
      articleList: [],
      total: 0,
      pageSize: 5,
      curPage: 1,
      input: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.getList();
    },
    getList() {
      let para = {
        curPage: this.curPage,
        pageSize: this.pageSize,
      };
      getArticleShowList(para).then(res => {
        this.articleList = res.data.data.items;
        this.total = res.data.data.total
      });
    },
    getParsedTime(timestamp) {
      return getParsedTime(timestamp);
    }
  }
};
</script>

<style scoped>
.div_top {
  height: 200px;
}
/* 文章列表 */
.div_article {
  margin-top: 24px;
}
.item_article .row {
  width: 100%;
  align-items: center;
  overflow: hidden;
}
.post-preview {
}
.post-preview > a {
  color: #212529;
}
.post-preview > a:hover {
  color: #007bff;
  text-decoration: none;
}
.post-preview > a > .post-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.post-preview > a > .post-subtitle {
  font-weight: 300;
  margin: 0 0 10px;
  /*文本超出隐藏*/
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /*显示文本行数*/
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.post-preview > .post-meta {
  font-size: 18px;
  font-style: italic;
  margin-top: 0;
  color: #868e96;
}
.post-preview > .post-meta > a {
  text-decoration: none;
  color: #212529;
}
p {
  line-height: 1.5;
  margin: 30px 0;
}
a {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 800;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.2;
  color: inherit;
}
.box-card{
  color: red;
  width: 400px;
  height: 100px;
}
</style>