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
                           v-if="permission.sysDemo_delete"
                           @click="handleDelete">删 除
                </el-button>
                <el-button type="info"
                           size="small"
                           plain
                           v-if="permission.sysDemo_excel"
                           icon="el-icon-download"
                           @click="handleExcel">导出Excel
                </el-button>
            </template>
            <template slot-scope="{row}"
                      slot="demoSelect">
                <el-tag>{{row.$demoSelect}}</el-tag>
            </template>
            <template slot-scope="{row}"
                      slot="demoXmselect">
                <el-tag>{{row.$demoXmselect}}</el-tag>
            </template>
            <template slot-scope="{row}"
                      slot="demoCheckbox">
                <el-tag>{{row.$demoCheckbox}}</el-tag>
            </template>
            <template slot-scope="{row}"
                      slot="demoRadio">
                <el-tag>{{row.$demoRadio}}</el-tag>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
    import {getList, getDetail, add, update, remove} from "@/api/system/sysDemo";
    import {mapGetters} from "vuex";
    import {getToken} from "@/util/auth";
    import {toGetUrl} from "@/util/util";

    export default {
        data() {
            return {
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
                    columnBtn: false,
                    height:'auto',
                    calcHeight: 30,
                    tip: false,
                    searchShow: true,
                    searchMenuSpan: 6,
                    searchIcon:true,
                    border: true,
                    index: true,
                    viewBtn: true,
                    selection: true,
                    dialogClickModal: false,
                    labelWidth: 150,
                    column: [
                        {
                            label: "文本框",
                            prop: "demoInput",
                            sortable: "custom", //开启自定义排序
                            search: true,
                            rules: [
                                { required: true, message: "请输入文本框", trigger: "blur"}
                            ]
                        },
                        {
                            label: "下拉框",
                            prop: "demoSelect",
                            type: "select",
                            dicUrl: this.website.dictUrl + "user_type",
                            props: this.website.dictProps,
                            slot: true,
                            search: true,
                            rules: [
                                { required: true, message: "请选择下拉框", trigger: "change"}
                            ]
                        },
                        {
                            label: "下拉复选框",
                            prop: "demoXmselect",
                            type: "select",
                            multiple: true,
                            filterable: true,
                            dicUrl: this.website.dictUrl + "user_type",
                            props: this.website.dictProps,
                            slot: true,
                            search: true,
                            rules: [
                                { required: true, message: "请输入下拉复选框", trigger: "blur"}
                            ]
                        },
                        {
                            label: "复选框",
                            prop: "demoCheckbox",
                            type: "checkbox",
                            dicUrl: this.website.dictUrl + "user_type",
                            props: this.website.dictProps,
                            slot: true,
                            search: true,
                            rules: [
                                { required: true, message: "请输入复选框", trigger: "blur"}
                            ]
                        },
                        {
                            label: "单选框",
                            prop: "demoRadio",
                            type: "radio",
                            dicUrl: this.website.dictUrl + "user_type",
                            props: this.website.dictProps,
                            slot: true,
                            search: true,
                            rules: [
                                { required: true, message: "请输入单选框", trigger: "blur"}
                            ]
                        },
                        {
                            label: "日期1",
                            prop: "demoDatetime",
                            type: "datetime",
                            format: "yyyy-MM-dd HH:mm:ss",
                            valueFormat: "yyyy-MM-dd HH:mm:ss",
                            align: "center",
                            search: true,
                            rules: [
                                { required: true, message: "请输入日期1", trigger: "blur"}
                            ]
                        },
                        {
                            label: "日期2",
                            prop: "demoDate",
                            type: "datetime",
                            format: "yyyy-MM-dd",
                            valueFormat: "yyyy-MM-dd",
                            align: "center",
                            search: true,
                            rules: [
                                { required: true, message: "请输入日期2", trigger: "blur"}
                            ]
                        },
                        {
                            label: "时间",
                            prop: "demoTime",
                            type: "time",
                            format: "HH:mm:ss",
                            valueFormat: "HH:mm:ss",
                            align: "center",
                            search: true,
                            rules: [
                                { required: true, message: "请输入时间", trigger: "blur"}
                            ]
                        },
                        {
                            label: "单文件上传",
                            prop: "demoUpload",
                            type: "upload",
                            action: this.website.uploadUrl,
                            propsHttp: {
                              home: this.$store.getters.uploadHttpPath,
                              res: "data"
                            },
                            data:{module:"system"},
                            loadText: "上传中，请稍等...",
                            listType: "picture-img", //上传图片样式，如果是上传其它附件，请注释掉
                            span: 24,
                        },
                        {
                            label: "多文件上传",
                            prop: "demoUploads",
                            type: "upload",
                            action: this.website.uploadUrl,
                            propsHttp: {
                              home: this.$store.getters.uploadHttpPath,
                              res: "data"
                            },
                            data:{module:"system"},
                            loadText: "上传中，请稍等...",
                            listType: "picture-card", //上传图片样式，如果是上传其它附件，请注释掉
                            multiple: true,
                            dataType: 'string',
                            span: 24,
                        },
                        {
                            label: "文本域",
                            prop: "demoTextarea",
                            type: "textarea",
                            search: true,
                            span: 24,
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
                    addBtn: this.vaildData(this.permission.sysDemo_add, false),
                    viewBtn: this.vaildData(this.permission.sysDemo_view, false),
                    delBtn: this.vaildData(this.permission.sysDemo_delete, false),
                    editBtn: this.vaildData(this.permission.sysDemo_edit, false)
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
                row.demoCheckbox = row.demoCheckbox.join(",");
                row.demoXmselect = row.demoXmselect.join(",");
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
                row.demoCheckbox = row.demoCheckbox.join(",");
                row.demoXmselect = row.demoXmselect.join(",");
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
            handleExcel() {
              this.$confirm("确定将导出数据?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                let params = {
                  [this.website.tokenHeader]:getToken(),
                  ...this.query,
                  ...this.sort
                };
                window.open(toGetUrl('/api/origtek-system/sysDemo/export',params));
              })
            },
            beforeOpen(done, type) {
                if (["edit", "view"].includes(type)) {
                    getDetail(this.form.id).then(res => {
                        this.form = res.data.data;
                        if(this.form.hasOwnProperty("demoCheckbox")){
                          this.form.demoCheckbox = this.form.demoCheckbox.split(",");
                        }
                        if(this.form.hasOwnProperty("demoXmselect")){
                          this.form.demoXmselect = this.form.demoXmselect.split(",");
                        }
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
            }
        }
    };
</script>

<style>
</style>
