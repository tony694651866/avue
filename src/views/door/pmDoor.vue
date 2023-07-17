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
                           v-if="permission.pmDoor_delete"
                           @click="handleDelete">删 除
                </el-button>
                <el-button type="primary"
                           size="small"
                           plain
                           v-if="permission.pmDoor_synchro"
                           icon="el-icon-refresh"
                           @click="handleSynchro">同步数据
                </el-button>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove, handleDataSynchro } from "@/api/door/pmDoor";
import { mapGetters } from "vuex";

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
        columnBtn: false,
        menu: true,
        selection: true,
        dialogClickModal: false,
        column: [
          {
            label: "门禁点名称",
            prop: "doorName",
            span: 12,
            search: true,
            align: "center",
            editDisabled: true,   //编辑的时候不能修改
            maxlength: 50,
          },
          {
            label: "门禁点序号",
            prop: "doorNo",
            span: 12,
            type: "number",
            sortable: "custom", //开启自定义排序
            align: "center",
            editDisabled: true,   //编辑的时候不能修改
            minRows: 0,
            maxRows: 1000,
          },
          {
            label: "门禁设备名称",
            prop: "deviceName",
            span: 12,
            search: true,
            align: "center",
            editDisabled: true,   //编辑的时候不能修改
            maxlength: 50,
          },
          {
            label: "门禁设备类型",
            prop: "deviceType",
            span: 12,
            align: "center",
            search: true,
            editDisabled: true,   //编辑的时候不能修改
            maxlength: 20,
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
        addBtn: this.vaildData(this.permission.pmDoor_add, false),
        viewBtn: this.vaildData(this.permission.pmDoor_view, false),
        delBtn: this.vaildData(this.permission.pmDoor_delete, false),
        editBtn: this.vaildData(this.permission.pmDoor_edit, false),
        synchroBtn: this.vaildData(this.permission.pmDoor_synchro, false)
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
    handleSynchro(loading) {
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
      };
      this.loading = true;
      getList(page.currentPage, page.pageSize, values).then((res) => {
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
