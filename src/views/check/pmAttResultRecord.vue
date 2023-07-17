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
                           v-if="permission.pmAttResultRecord_delete"
                           @click="handleDelete">删 除
                </el-button>
                <el-button type="warning"
                           size="small"
                           plain
                           v-if="permission.pmAttResultRecord_export"
                           icon="el-icon-download"
                           @click="handleExport">导出Excel
                </el-button>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
import {getList, getDetail, add, update, remove, getAttResultRecord} from "@/api/check/pmAttResultRecord";
import {mapGetters} from "vuex";
import { getToken } from "@/util/auth";
import { toGetUrl } from "@/util/util";

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
                searchLabelWidth: 120, //搜索框的标题宽度
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
                menu: false,
                dialogClickModal: false,
                column: [
                    {
                        label: "人员名称",
                        prop: "personName",
                        span: 12,
                        search: true,
                        align: "center",
                    },
                    {
                        label: "部门名称",
                        prop: "deptName",
                        span: 12,
                        search: true,
                        align: "center",
                    },
                    {
                        label: "班组编号",
                        prop: "groupCode",
                        span: 12,
                        align: "center",
                    },
                    {
                        label: "班次编号",
                        prop: "shiftCode",
                        span: 12,
                        align: "center",
                    },
                    {
                        label: "上班日期",
                        prop: "onDutyDate",
                        span: 12,
                        type: "datetime",
                        with: 140,
                        format: "yyyy-MM-dd HH:mm:ss",
                        valueFormat: "yyyy-MM-dd HH:mm:ss",
                        searchRange: true,
                        align: "center",
                        search: true,
                    },
                    {
                        label: "第几时段",
                        prop: "timePeriodNo",
                        span: 12,
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "上班打卡时间",
                        prop: "clockOnTime",
                        span: 12,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        valueFormat: "yyyy-MM-dd HH:mm:ss",
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "上班状态",
                        prop: "onStatus",
                        span: 12,
                        align: "center",
                    },
                    {
                        label: "上班打卡读头名称",
                        prop: "acReaderNameOn",
                        span: 12,
                        hide: true,
                        align: "center",
                    },
                    {
                        label: "上班打卡门名称",
                        prop: "doorNameOn",
                        span: 12,
                        hide: true,
                        align: "center",
                    },
                    {
                        label: "上班打卡控制器名称",
                        prop: "controllerNameOn",
                        span: 12,
                        hide: true,
                        align: "center",
                    },
                    {
                        label: "上班刷卡卡号",
                        prop: "cardNoOn",
                        span: 12,
                        align: "center",
                        search: true,
                        hide: true,
                    },
                    {
                        label: "迟到时长",
                        prop: "minuteLate",
                        span: 12,
                        align: "center",
                    },
                    {
                        label: "上班时间",
                        prop: "onTime",
                        span: 12,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        valueFormat: "yyyy-MM-dd HH:mm:ss",
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "下班时间",
                        prop: "offTime",
                        span: 12,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        valueFormat: "yyyy-MM-dd HH:mm:ss",
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "下班打卡时间",
                        prop: "clockOffTime",
                        span: 12,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        valueFormat: "yyyy-MM-dd HH:mm:ss",
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "下班状态",
                        prop: "offStatus",
                        span: 12,
                        align: "center",
                        search: true,
                    },
                    {
                        label: "下班刷卡读头名称",
                        prop: "acReaderNameOff",
                        span: 12,
                        hide: true,
                        align: "center",
                    },
                    {
                        label: "下班刷卡门名称",
                        prop: "doorNameOff",
                        span: 12,
                        hide: true,
                        align: "center",
                    },
                    {
                        label: "下班刷卡控制器名称",
                        prop: "controllerNameOff",
                        span: 12,
                        hide: true,
                        align: "center",
                    },
                    {
                        label: "下班刷卡卡号",
                        prop: "cardNoOff",
                        span: 12,
                        search: true,
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "请假时长",
                        prop: "minLeave",
                        span: 12,
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "调休时长",
                        prop: "minCompLeave",
                        span: 12,
                        align: "center",
                        hide: true,
                    },
                    {
                        label: "加班时长",
                        prop: "minOverTime",
                        span: 12,
                        align: "center",
                    },
                    {
                        label: "出勤时长",
                        prop: "minAttend",
                        span: 12,
                        align: "center",
                    },
                    {
                        label: "应上工时",
                        prop: "timeAll",
                        span: 12,
                        align: "center",
                    },
                    {
                        label: "不足工时",
                        prop: "lessTime",
                        span: 12,
                        align: "center",
                    },
                    {
                        label: "创建时间",
                        prop: "createTime",
                        span: 12,
                        type: "datetime",
                        format: "yyyy-MM-dd",
                        valueFormat: "yyyy-MM-dd",
                        sortable: "custom", //开启自定义排序
                        align: "center",
                        hide: true,
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
                addBtn: this.vaildData(this.permission.pmAttResultRecord_add, false),
                viewBtn: this.vaildData(this.permission.pmAttResultRecord_view, false),
                delBtn: this.vaildData(this.permission.pmAttResultRecord_delete, false),
                editBtn: this.vaildData(this.permission.pmAttResultRecord_edit, false),
                exportBtn: this.vaildData(this.permission.pmInOutRecord_export, false)
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
        handleExport() {
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
                window.open(toGetUrl('/api/origtek-check/pmAttResultRecord/exportExt',params));
            })
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
            if (params.hasOwnProperty("onDutyDate")) {
            if (Array.isArray(params.onDutyDate)) {
                params.onDutyDateExt = params.onDutyDate[0] + "," + params.onDutyDate[1];
            } else {
                params.onDutyDateExt = params.onDutyDate;
            }
                delete params.onDutyDate;
            }
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
                ...this.sort,
                current: page.currentPage,
                size: page.pageSize
            };
            this.loading = true;
            getAttResultRecord(values).then(res => {
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

<style lang="scss" scoped>
</style>
