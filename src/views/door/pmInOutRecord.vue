<template>
  <basic-container>
    <avue-crud
      :option="option"
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
      @on-load="onLoad"
    >
      <template slot="menuLeft">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          plain
          v-if="permission.pmInOutRecord_delete"
          @click="handleDelete"
          >删 除
        </el-button>
        <el-button
          type="warning"
          size="small"
          plain
          v-if="permission.pmInOutRecord_export"
          icon="el-icon-download"
          @click="handleExport"
          >导出Excel
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  getInOutRecordList,
  getDetail,
  add,
  update,
  remove,
  handleDataSynchro,
} from "@/api/door/pmInOutRecord";
import { mapGetters } from "vuex";
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
        total: 0,
      },
      selectionList: [],
      option: {
        height: "auto",
        calcHeight: 30,
        searchLabelWidth: 100, //搜索框的标题宽度
        labelWidth: 110, //弹出表单的标题的统一宽度
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        searchIcon: true,
        border: true,
        index: true,
        viewBtn: true,
        menu: false,
        columnBtn: false,
        selection: true,
        dialogClickModal: false,
        column: [
          {
            label: "门禁点名称",
            prop: "doorName",
            span: 12,
            search: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            align: "center",
          },
          {
            label: "门禁事件类型",
            prop: "eventType",
            span: 12,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            align: "center",
          },
          {
            label: "发生时间",
            prop: "eventTime",
            span: 12,
            type: "datetime",
            width: 140,
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            searchRange: true,
            /*sortable: "custom", //开启自定义排序*/
            align: "center",
            search: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
          },
          {
            label: "事件名称",
            prop: "eventName",
            span: 12,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            align: "center",
          },
          {
            label: "读卡器类型",
            prop: "deviceType",
            span: 12,
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            align: "center",
          },
          {
            label: "卡号",
            prop: "cardNo",
            span: 12,
            sortable: "custom", //开启自定义排序
            search: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            align: "center",
          },
          {
            label: "人员名称",
            prop: "personName",
            align: "center",
            span: 12,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
          },
          {
            label: "部门名称",
            prop: "deptName",
            align: "center",
            span: 12,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
          },
          {
            label: "进出类型",
            prop: "inOut",
            align: "center",
            type: "select",
            overHidden: true,
            dataType: 'String',
            props: this.website.dictProps,
            dicUrl: this.website.dictUrl + "in_out_type",
            span: 12,
            search: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
          },
        ],
      },
      data: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.pmInOutRecord_add, false),
        viewBtn: this.vaildData(this.permission.pmInOutRecord_view, false),
        delBtn: this.vaildData(this.permission.pmInOutRecord_delete, false),
        editBtn: this.vaildData(this.permission.pmInOutRecord_edit, false),
        exportBtn: this.vaildData(this.permission.pmInOutRecord_export, false),
        synchroBtn: this.vaildData(
          this.permission.pmInOutRecord_synchro,
          false
        )
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    rowSave(row, done, loading) {
      add(row).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          loading();
          window.console.log(error);
        }
      );
    },
    rowUpdate(row, index, done, loading) {
      update(row).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          loading();
          console.log(error);
        }
      );
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
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
        type: "warning",
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          this.$refs.crud.toggleSelection();
        });
    },
    handleExport() {
      this.$confirm("确定将导出数据?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          [this.website.tokenHeader]: getToken(),
          ...this.query,
          ...this.sort,
        };
        window.open(toGetUrl("/api/origtek-door/pmInOutRecord/exportExt", params));
      });
    },
    handleSynchro() {
      this.$confirm("确定同步服务器数据?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          return handleDataSynchro();
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        },
        (error) => {
          this.loading = false;
          console.log(error);
        });
    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then((res) => {
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
      if (params.hasOwnProperty("eventTime")) {
        if (Array.isArray(params.eventTime)) {
          params.eventTimeExt = params.eventTime[0] + "," + params.eventTime[1];
        } else {
          params.eventTimeExt = params.eventTime;
        }

        delete params.eventTime;
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
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    sortChange(val) {
      this.sort = {};
      if (val.order === "ascending") {
        this.sort.ascs = val.prop;
      } else if (val.order === "descending") {
        this.sort.descs = val.prop;
      }
      this.onLoad(this.page, this.query);
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
      getInOutRecordList(values).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.list;
        this.loading = false;
        this.selectionClear();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
