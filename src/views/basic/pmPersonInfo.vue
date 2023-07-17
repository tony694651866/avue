<template>
    <basic-container>
        <avue-crud :option="option"
                   :table-loading="loading"
                   :data="data"
                   :page.sync="page"
                   :permission="permissionList"
                   :before-open="beforeOpen"
                   v-model="form"
                   ref="crud"
                   @row-update="rowUpdate"
                   @row-save="rowSave"
                   @row-del="rowDel"
                   @search-change="searchChange"
                   @search-reset="searchReset"
                   @selection-change="selectionChange"
                   @current-change="currentChange"
                   @size-change="sizeChange"
                   @refresh-change="refreshChange"
                   @sort-change="sortChange"
                   @on-load="onLoad">
            <template slot="menuLeft">
                <el-button type="danger"
                           size="small"
                           icon="el-icon-delete"
                           plain
                           v-if="permission.pmPersonInfo_delete"
                           @click="handleDelete">删 除
                </el-button>
                <el-upload class="upload-demo upload-style"
                    :headers="headers"
                    :action="userInfoActionUrl"
                    :before-upload="beforeUserInfoUpload"
                    :on-success="handleAvatarSuccess"
                    :on-error="onError"
                    :show-file-list="false">
                    <el-button type="primary" size="small" icon="el-icon-document-add">批量导入</el-button>
                </el-upload>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
import {getList, getDetail, add, update, remove} from "@/api/basic/pmPersonInfo";
import {mapGetters} from "vuex";
import {getToken} from '@/util/auth';

export default {
    data() {
        return {
            headers: {[this.website.tokenHeader]: 'Bearer ' + getToken()},
            userInfoActionUrl: "/api/origtek-basic/pmPersonInfo/importUserInfo",
            form: {},
            sort: {},
            query: {},
            loading: true,
            page: {
                pageSize: 10,
                currentPage: 1,
                total: 0
            },
            selectionList: [],
            option: {
                height:'auto',
                calcHeight: 30,
                searchLabelWidth: 80, //搜索框的标题宽度
                labelWidth: 110, //弹出表单的标题的统一宽度
                tip: false,
                searchShow: true,
                searchMenuSpan: 6,
                searchIcon:true,
                border: true,
                index: true,
                viewBtn: true,
                columnBtn: false,
                selection: true,
                dialogClickModal: false,
                column: [
                    {
                        label: "人员编号",
                        prop: "personNo",
                        span: 12,
                        hide: true,
                        align: "center",
                        maxlength: 30,
                        rules: [{ required: true, message: "请输入人员编号", trigger: "blur"}]
                    },
                    {
                        label: "人员名称",
                        prop: "personName",
                        span: 12,
                        align: "center",
                        search: true,
                        maxlength: 50,
                        rules: [{ required: true, message: "请输入人员名称", trigger: "blur"}]
                    },
                    {
                        label: "证件类别",
                        prop: "certificateType",
                        span: 12,
                        align: "center",
                         maxlength: 20,
                    },
                    {
                        label: "证件号码",
                        prop: "certificateNo",
                        span: 12,
                        align: "center",
                        search: true,
                        maxlength: 50,
                        rules: [
                            { required: true, message: "请输入证件号码", trigger: "blur"}
                        ]
                    },
                    {
                        label: "出生日期",
                        prop: "birthday",
                        span: 12,
                        type: "datetime",
                        format: "yyyy-MM-dd",
                        valueFormat: "yyyy-MM-dd",
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "姓名拼音",
                        prop: "personPinYin",
                        span: 12,
                        hide: true,
                        align: "center", 
                        maxlength: 20,
                    },
                    {
                        label: "联系电话",
                        prop: "phoneNo",
                        span: 12,
                        hide: true,
                        align: "center",
                         maxlength: 20,
                    },
                    {
                        label: "联系地址",
                        prop: "address",
                        span: 12,
                        hide: true,
                        align: "center",
                        maxlength: 500,
                    },
                    {
                        label: "照片",
                        prop: "photo",
                        span: 12,
                        hide: true,
                        align: "center",
                        maxlength: 500,
                    },
                    {
                        label: "英文名",
                        prop: "englishName",
                        span: 12,
                        hide: true,
                        align: "center",
                        maxlength: 20,
                    },
                    {
                        label: "邮箱",
                        prop: "email",
                        span: 12,
                        hide: true,
                        align: "center",
                        maxlength: 50,
                    },
                    {
                        label: "入职日期",
                        prop: "entryDate",
                        span: 12,
                        type: "datetime",
                        format: "yyyy-MM-dd",
                        valueFormat: "yyyy-MM-dd",
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "离职日期",
                        prop: "leaveDate",
                        span: 12,
                        type: "datetime",
                        format: "yyyy-MM-dd",
                        valueFormat: "yyyy-MM-dd",
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "学历",
                        prop: "education",
                        span: 12,
                        hide: true,
                        align: "center",
                        maxlength: 50,
                    },
                    {
                        label: "民族",
                        prop: "nation",
                        span: 12,
                        hide: true,
                        align: "center",
                        maxlength: 50,
                    },
                    {
                        label: "所属部门",
                        prop: "deptUuid",
                        span: 12,
                        hide: true,
                        align: "center",
                        maxlength: 50,
                        addDisplay: false,
                        editDisplay: false,
                        viewDisplay: false,
                        rules: [
                            { required: true, message: "请输入所属部门", trigger: "blur"}
                        ]
                    },
                    {
                        label: "部门编号",
                        prop: "deptNo",
                        span: 12,
                        align: "center",
                        addDisplay: false,
                        hide: true,
                        editDisplay: false,
                        viewDisplay: false,
                        maxlength: 50,
                    },
                    {
                        label: "卡号",
                        prop: "carNo",
                        span: 12,
                        align: "center",
                        search: true,
                        maxlength: 20,
                        rules: [
                            { required: true, message: "请输入门禁卡号", trigger: "blur"}
                        ]
                    },
                    {
                        label: "项目组织",
                        prop: "projectOrg",
                        span: 12,
                        align: "center",
                        addDisplay: false,
                        editDisplay: false,
                        viewDisplay: false,
                        maxlength: 50,
                    },
                    {
                        label: "部门名称",
                        prop: "deptName",
                        span: 12,
                        align: "center",
                        maxlength: 50,
                        rules: [
                            { required: true, message: "请输入部门名称", trigger: "blur"}
                        ]
                    },
                    {
                        label: "部门路径",
                        prop: "deptPath",
                        span: 12,
                        align: "center",
                        hide: true,
                        addDisplay: false,
                        editDisplay: false,
                        viewDisplay: false,
                        maxlength: 500,
                    },
                    {
                        label: "身份名称",
                        prop: "identityUuid",
                        span: 12,
                        align: "center",
                        hide: true,
                        addDisplay: false,
                        editDisplay: false,
                        viewDisplay: false,
                        maxlength: 50,
                    },
                    {
                        label: "身份名称",
                        prop: "identityName",
                        span: 12,
                        align: "center",
                        maxlength: 50,
                    },
                    {
                        label: "人员状态",
                        align: "center",
                        hide: true,
                        prop: "personStatus",
                        span: 12,
                        maxlength: 20,
                    },
                ]
            },
            data: []
        };
    },
    computed: {
        ...mapGetters(["permission"]),
        permissionList() {
            return {
                addBtn: this.vaildData(this.permission.pmPersonInfo_add, false),
                viewBtn: this.vaildData(this.permission.pmPersonInfo_view, false),
                delBtn: this.vaildData(this.permission.pmPersonInfo_delete, false),
                editBtn: this.vaildData(this.permission.pmPersonInfo_edit, false)
            };
        },
        ids() {
            let ids = [];
            this.selectionList.forEach(ele => {
                ids.push(ele.id);
            });
            return ids.join(",");
        }
    },
    methods: {
        rowSave(row, done, loading) {
            add(row).then(() => {
                this.onLoad(this.page);
                this.$message({
                    type: "success",
                    message: "操作成功!"
                });
                done();
            }, error => {
                loading();
                window.console.log(error);
            });
        },
        rowUpdate(row, index, done, loading) {
            update(row).then(() => {
                this.onLoad(this.page);
                this.$message({
                    type: "success",
                    message: "操作成功!"
                });
                done();
            }, error => {
                loading();
                console.log(error);
            });
        },
        rowDel(row) {
            this.$confirm("确定将选择数据删除?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    return remove(row.id);
                })
                .then(() => {
                    this.onLoad(this.page);
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                });
        },
        handleDelete() {
            if (this.selectionList.length === 0) {
                this.$message.warning("请选择至少一条数据");
                return;
            }
            this.$confirm("确定将选择数据删除?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    return remove(this.ids);
                })
                .then(() => {
                    this.onLoad(this.page);
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                    this.$refs.crud.toggleSelection();
                });
        },
        beforeOpen(done, type) {
            if (["edit", "view"].includes(type)) {
                getDetail(this.form.id).then(res => {
                    this.form = res.data.data;
                });
            }
            done();
        },
        searchReset() {
            this.query = {};
            this.onLoad(this.page);
        },
        searchChange(params, done) {
            this.query = params;
            this.page.currentPage = 1;
            this.onLoad(this.page, params);
            done();
        },
        selectionChange(list) {
            this.selectionList = list;
        },
        selectionClear() {
            this.selectionList = [];
            this.$refs.crud.toggleSelection();
        },
        currentChange(currentPage){
            this.page.currentPage = currentPage;
        },
        sizeChange(pageSize){
            this.page.pageSize = pageSize;
        },
        refreshChange() {
            this.onLoad(this.page, this.query);
        },
        sortChange(val){
            this.sort = {};
            if(val.order==="ascending"){
                this.sort.ascs = val.prop;
            }else if(val.order==="descending"){
                this.sort.descs = val.prop;
            }
            this.onLoad(this.page,this.query);
        },
        onLoad(page, params = {}) {
            let values = {
                ...params,
                ...this.query,
                ...this.sort
            };
            this.loading = true;
            getList(page.currentPage, page.pageSize, values).then(res => {
                const data = res.data.data;
                this.page.total = data.total;
                this.data = data.list;
                this.loading = false;
                this.selectionClear();
            });
        },
        handleAvatarSuccess (res, file) {
            if (res.code !== 200) {
                this.$message.error(res.msg);
                return false;
            }
            this.$message.success('共导入' + res.data + '条数据');
            this.onLoad(this.page);
        },
        onError (err, file, fileList) {
            if (err) {
                this.$message.error('导入数据异常');
            }
        },
        beforeUserInfoUpload (file) {
            this.files = file
            let extension = file.name.split('.')[1] === 'xls';
            let extension2 = file.name.split('.')[1] === 'xlsx';
            if (!extension && !extension2) {
                this.$message.warning('上传文件只能是 xls、xlsx格式!');
                return
            }
            this.fileName = file.name;
            this.$message.info('正在导入，请耐心等待');
        },
    }
};
</script>

<style lang="scss" scoped>
.upload-style{
    float: right;
    padding-left: 5px;
    position: relative;
}
</style>
