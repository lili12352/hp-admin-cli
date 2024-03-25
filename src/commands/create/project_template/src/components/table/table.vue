<template>
  <div>//#hook_1</div>
</template>

//#end;
<script>
return {
  slot: {
    hook_1: {
      element: function () {
        return `<el-table :data="props.dataSource" v-bind="attrs">
      <el-table-column
        v-for="item in props.colums"
        :key="item.key"
        :prop="item.key"
        :label="item.title"
        v-bind="item"
      >
        <template #default="scope">
          <slot :name="item.key" :row="scope.row">
            {{ scope.row[item.key] }}
          </slot>
        </template>
      </el-table-column>
    </el-table>`;
      },
      antdv: function () {
        return `<a-table :dataSource="props.dataSource" :columns="props.columns" />`;
      },
    },
  },
};
</script>
