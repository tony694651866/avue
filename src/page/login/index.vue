<template>
  <div class="login-container"
       ref="login"
       @keyup.enter.native="handleLogin">
    <top-color v-show="false"></top-color>
    <div class="login-weaper animated bounceInDown">
      <div class="login-left">
        <div class="login-time">
          {{time}}
        </div>
        <img class="img" src="/img/logo.png" alt="">
        <p class="title">{{ $t('login.info') }}</p>
      </div>
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">
            {{ $t('login.title') }}{{website.title}}
            <top-lang></top-lang>
          </h4>
          <userLogin v-if="activeName==='user'"></userLogin>
          <codeLogin v-else-if="activeName==='code'"></codeLogin>
          <thirdLogin v-else-if="activeName==='third'"></thirdLogin>
          <div class="login-menu">
<!--            <a href="#" @click.stop="activeName='user'">{{ $t('login.userLogin') }}</a>-->
            <!--<a href="#" @click.stop="activeName='code'">{{ $t('login.phoneLogin') }}</a>-->
<!--            <a href="#" @click.stop="activeName='third'">{{ $t('login.thirdLogin') }}</a>-->
          </div>
        </div>

      </div>
    </div>
    <div class="login-authc">
      <el-button type="primary"
        size="big"
        plain
        @click="openAuthorize">授权管理
      </el-button>
    </div>
    <el-dialog title="授权管理"
      :visible.sync="authorizeFormVisible"
      :close-on-click-modal="false"
      class="edit-form">
      <el-form v-loading="authorizeLoading" :model="authorizeForm" label-width="100px" ref="authorizeForm">
          <el-form-item label="机器码：">
            <el-col :span="19">
              <el-input v-model="authorizeForm.machinecode"></el-input>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" @click="exportCod" class="el-button-left">导出</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="授权文件：">
            <el-col :span="19">
              <el-input v-model="authorizeForm.file"></el-input>
            </el-col>
            <el-col :span="2.5">
              <el-upload
                class="upload-demo"
                :auto-upload="true"
                :limit="1"
                :file-list="fileList"
                :on-exceed="handleExceed"
                :on-change="handOnChang"
                ref="rebateUpload"
                action="/api/origtek-system/empower/uploadAuthFile"
                :show-file-list="false"
                :on-success="handleFileSuccess"
                :on-error="handleFileError"
                :before-upload="handleBeforeUpload">
                <el-button class="el-button-left" type="primary">浏览</el-button>
              </el-upload>
            </el-col>
            <el-col :span="2.5">
              <el-button type="primary" @click="handleAuthorize" class="el-button-left">授权</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="授权状态：">
            <span>{{authorizeForm.msg}}</span>
          </el-form-item>
          <el-form-item label="到期时间：">
            <span>{{authorizeForm.toDate}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleCancel">关闭</el-button>
        </div>
    </el-dialog>    
  </div>
</template>
<script>
  import userLogin from "./userlogin";
  import codeLogin from "./codelogin";
  import thirdLogin from "./thirdlogin";
  import {mapGetters} from "vuex";
  import {dateFormat} from "@/util/date";
  import {validatenull} from "@/util/validate";
  import topLang from "@/page/index/top/top-lang";
  import topColor from "@/page/index/top/top-color";
  import {getQueryString, getTopUrl} from "@/util/util";
  import { getMachineCode, exportCod, authImmediately, uploadAuthFile } from "@/api/empower/empower";

  export default {
    name: "login",
    components: {
      userLogin,
      codeLogin,
      thirdLogin,
      topLang,
      topColor
    },
    data() {
      return {
        time: "",
        activeName: "user",
        socialForm: {
          tenantId: "000000",
          source: "",
          code: "",
          state: "",
        },
        authorizeLoading: false,
        limit: 1,
        fileList:[],
        authorizeFormVisible: false,
        authorizeForm: {
          machinecode: '',
          file: null,
          toDate: '',
          authState: '',
          msg: ''
        }
      };
    },
    watch: {
      $route() {
        this.handleLogin();
      }
    },
    created() {
      this.handleLogin();
      this.getTime();
    },
    mounted() {
    },
    computed: {
      ...mapGetters(["website", "tagWel"])
    },
    props: [],
    methods: {
      getTime() {
        setInterval(() => {
          this.time = dateFormat(new Date());
        }, 1000);
      },
      handleLogin() {
        const topUrl = getTopUrl();
        const redirectUrl = "/oauth/redirect/";
        this.socialForm.source = getQueryString("source");
        this.socialForm.code = getQueryString("code");
        this.socialForm.state = getQueryString("state");
        if (validatenull(this.socialForm.source) && topUrl.includes(redirectUrl)) {
          let source = topUrl.split("?")[0];
          source = source.split(redirectUrl)[1];
          this.socialForm.source = source;
        }
        if (!validatenull(this.socialForm.source) && !validatenull(this.socialForm.code) && !validatenull(this.socialForm.state)) {
          const loading = this.$loading({
            lock: true,
            text: '第三方系统登录中,请稍后。。。',
            spinner: "el-icon-loading"
          });
          this.$store.dispatch("LoginBySocial", this.socialForm).then(() => {
            window.location.href = topUrl.split(redirectUrl)[0];
            this.$router.push({path: this.tagWel.value});
            loading.close();
          }).catch(() => {
            loading.close();
          });
        }
      },
      openAuthorize(){
        //dialog对话窗口打开
        this.authorizeFormVisible = true;
        this.authorizeLoading = true;
        this.authorizeForm = [];
        // 查询机器码
        getMachineCode().then((res) => {
          this.authorizeForm.machinecode =res.data.bizData.machineCode;
          this.authorizeLoading = false;
        },
        (error) => {
          this.authorizeLoading = false;
          console.log(error);
        });
      },
      handleAuthorize() {
        this.authorizeLoading = true;
        // 授权
        authImmediately().then((res) => {
          console.info(res.data);
          if(res.data.bizData.authState=="0"){
            this.authorizeForm.msg = res.data.bizData.msg;
          }else{
            this.authorizeForm.msg = res.data.bizData.msg;
            this.authorizeForm.toDate = res.data.bizData.toDate;
          }
          this.authorizeLoading = false;
        },
        (error) => {
          this.authorizeLoading = false;
          console.log(error);
        });
      },
      //取消
      handleCancel() {
        //dialog对话窗口关闭
        this.authorizeFormVisible = false;
      },
      exportCod(){
        window.open("/api/origtek-system/empower/exportCod");
        // // 导出
        // exportCod().then((res) => {
        //   console.info(res.data);
        //   this.authorizeLoading = false;
        // },
        // (error) => {
        //   this.authorizeLoading = false;
        //   console.log(error);
        // });
      },
      importCod(){
        // this.$nextTick(() => {
        //   this.$refs.upload.submit();
        // })
        this.$refs.upload.submit();
        // // 导入上传
        // uploadAuthFile().then((res) => {
        //   console.info(res.data);
        // });
      },
      // 上传文件之前的钩子
      handleBeforeUpload(file){
        this.authorizeLoading = true;
        console.log('before');
      },
      handOnChang(file, fileList){
        this.authorizeForm.file = file.name;
      },
      handleExceed(files, fileList) {
        this.$set(fileList[0], "raw", files[0]);
        this.$set(fileList[0], "name", files[0].name);
        this.$refs["rebateUpload"].clearFiles(); //清除文件
        this.$refs["rebateUpload"].handleStart(files[0]); //选择文件后的赋值方法
      },
      handleFileSuccess(){
        // 必须清除一次
        this.$refs.rebateUpload.clearFiles();
        this.authorizeLoading = false;
      },
      handleFileError(){
        // 必须清除一次
        this.$refs.rebateUpload.clearFiles();
        this.authorizeLoading = false;
      }
    }
  };
</script>

<style lang="scss">
  @import "@/styles/login.scss";
</style>
