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
                           v-if="permission.ledDevice_delete"
                           @click="handleDelete">删 除
                </el-button>
            </template>
            <template  slot-scope="scope" slot="window">
                <el-button type="primary"
                           size="small"
                           plain
                           @click="handSetWindow(scope.row)">设置屏幕
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
import {getList, getDetail, add, update, remove, changeStatus, setParamToLedDevice} from "@/api/led/ledDevice";
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
                        label: "led模板名称",
                        prop: "letTemplateId",
                        type: "select",
                        span: 12,
                        align: "center",
                        slot: true,
                        dicUrl: "/api/origtek-led/ledTemplate/select",
                        props: {
                            label: "templateName",
                            value: "id"
                        },
                    },
                    {
                        label: "x坐标",
                        prop: "x",
                        span: 12,
                        type: "number",
                        align: "center",
                        width: 80,
                        minRows: 0,
                        maxRows: 1000,
                        rules: [{ required: true, message: "请输入x坐标", trigger: "blur"}]
                    },
                    {
                        label: "y坐标",
                        prop: "y",
                        type: "number",
                        span: 12,
                        width: 80,
                        align: "center",
                        minRows: 0,
                        maxRows: 1000,
                        rules: [
                            { required: true, message: "请输入y坐标", trigger: "blur"}
                        ]
                    },
                    {
                        label: "宽度",
                        prop: "width",
                        type: "number",
                        span: 12,
                        align: "center",
                        minRows: 0,
                        maxRows: 1000,
                        rules: [
                            { required: true, message: "请输入宽度", trigger: "blur"}
                        ]
                    },
                    {
                        label: "高度",
                        prop: "height",
                        type: "number",
                        span: 12,
                        align: "center",
                        minRows: 0,
                        maxRows: 1000,
                        rules: [
                            { required: true, message: "请输入高度", trigger: "blur"}
                        ]
                    },
                    {
                        label: "led屏ID",
                        prop: "ledId",
                        span: 12,
                        search: true,
                        align: "center",
                        maxlength: 8,
                        rules: [
                            { required: true, message: "请输入led屏ID", trigger: "blur"}
                        ]
                    },
                    {
                        label: "ip",
                        prop: "ip",
                        span: 12,
                        search: true,
                        align: "center",
                        rules: [{ required: true,message:"请输入正确的ip地址",  trigger: "blur"}
                                ,{ required: true, trigger: "blur", validator: this.fieldValidator.validateIp }]
                    },
                    {
                        label: "端口",
                        prop: "port",
                        span: 12,
                        align: "center",
                        type: "number",
                        minRows: 1,
                        maxRows: 65535,
                        rules: [
                            { required: true, message: "请输入端口", trigger: "blur"}
                        ]
                    },
                    {
                        label: "字体",
                        prop: "fontFamily",
                        hide: true,
                        align: "center",
                        span: 12,
                        maxlength: 50,
                    },
                    {
                        label: "字体大小",
                        prop: "fontSize",
                        hide: true,
                        type: "number",
                        span: 12,
                        align: "center",
                        minRows: 1,
                        maxRows: 60,
                    },
                    {
                        label: "额外参数",
                        hide: true,
                        prop: "extData",
                        align: "center",
                        span: 12,
                        maxlength: 200,
                    },
                     {
                        label: "屏幕大小",
                        prop: "window",
                        align: "center",
                        span: 12,
                        addDisplay: false,
                        editDisplay: false,
                        viewDisplay: false,
                    },
                    {
                        label: "状态",
                        prop: "status",
                        span: 12,
                        align: "center",
                        type: "radio",
                        overHidden: true,
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
                addBtn: this.vaildData(this.permission.ledDevice_add, false),
                viewBtn: this.vaildData(this.permission.ledDevice_view, false),
                delBtn: this.vaildData(this.permission.ledDevice_delete, false),
                editBtn: this.vaildData(this.permission.ledDevice_edit, false)
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
            let state = 0;
            if (row.status || row.status==1) {
                state = 1;
            }
            row.status = state;
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
            let state = 0;
            if (row.status || row.status==1) {
                state = 1;
            }
            row.status = state;
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
        handSetWindow(row){
            this.loading = true;
            let param = row;
            let state = 0;
            if (row.status || row.status==1) {
                state = 1;
            }
            param.status = state;
            setParamToLedDevice(param).then(res => {
                this.loading = false;
                let message ="操作成功!";
                if(res.data.data==0){
                    this.$message.error("操作失败");
                }else{
                    this.$message({
                        type: "success",
                        message: message
                    });
                }
                this.onLoad(this.page, this.query);
            }, error => {
                this.loading = false;
                this.$message.error("服务器异常");
                console.log(error);
            });
        },
        isShowSwitchChange(row) {
            console.log(row.status);
            let state = 0;
            if (row.status || row.status==1) {
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
