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
                           v-if="permission.ledTemplate_delete"
                           @click="handleDelete">删 除
                </el-button>
            </template>
            <template slot="status" slot-scope="scope">
                <el-switch
                active-text="展示"
                inactive-text="隐藏"
                class="switchStyle"
                v-model="scope.row.status"
                active-color="#13ce66"
                @change="isShowSwitchChange(scope.row)"
                inactive-color="#ff4949"
                >
                </el-switch>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
import {getList, getDetail, add, update, remove,changeStatus} from "@/api/led/ledTemplate";
import {mapGetters} from "vuex";

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
                        label: "主题名称",
                        prop: "templateName",
                        span: 24,
                        align: "center",
                        search: true,
                        maxlength: 50,
                        width: 200,
                        rules: [
                            { required: true, message: "请输入主题名称", trigger: "blur"}
                        ]
                    },
                    {
                        label: "主题",
                        prop: "data",
                        span: 24,
                        type: "textarea",
                        overHidden: true, //超出隐藏
                        align: "center",
                        rules: [
                            { required: true, message: "请输入主题", trigger: "blur"}
                        ]
                    },
                    {
                        label: "状态",
                        prop: "status",
                        span: 12,
                        align: "center",
                        type: "radio",
                        overHidden: true,
                        width: 150,
                        props: this.website.dictProps,
                        dicUrl: this.website.dictUrl + "t_is_show",
                        addDisplay: false,
                        editDisplay: false,
                        viewDisplay: false,
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
                addBtn: this.vaildData(this.permission.ledTemplate_add, false),
                viewBtn: this.vaildData(this.permission.ledTemplate_view, false),
                delBtn: this.vaildData(this.permission.ledTemplate_delete, false),
                editBtn: this.vaildData(this.permission.ledTemplate_edit, false)
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
                if(data!=null && data.list!=null){
                    for(let i=0;i<data.list.length;i++){
                        data.list[i].status = data.list[i].status == 1 ? true :false;
                    }
                }
                this.data = data.list;
                this.loading = false;
                this.selectionClear();
            });
        },
        isShowSwitchChange(row) {
            console.log(row.status);
            let state = 0;
            if (row.status) {
                state = 1;
            }
            changeStatus({ id: row.id, status: state })
            .then(res => {
                this.onLoad(this.page, this.query);
            })
            .catch(() => {
                this.$message.error("服务器异常");
            });
        },
    }
};
</script>

<style lang="scss" scoped>
</style>
