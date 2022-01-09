<template>
  <div class="layout-navbar">
    <h4 class="layout-navbar__home" @click="$router.push('/')">
      <i class="el-icon-s-home"></i>
    </h4>
    <div class="layout-navbar__nav">
      <layout-router :direction="'horizontal'" @close="drawer = false" />
    </div>
    <h4 class="layout-navbar__more" @click="openNav">
      <i class="el-icon-more"></i>
    </h4>

    <el-drawer :visible.sync="drawer" :direction="'ttb'">
      <layout-router :direction="'vertical'" @close="drawer = false" />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { RWD } from "@/utils";
import LayoutRouter from "./Router.vue";
export default {
  name: "LayoutNavbar",
  components: {
    LayoutRouter,
  },
  computed: {
    ...mapGetters(["windowWidth"]),
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    /**
     * 開啟抽屜導覽
     */
    openNav() {
      this.drawer = this.windowWidth < RWD.sm;
    },
  },
  watch: {
    windowWidth(val) {
      // 小視窗時，關閉抽屜導覽
      if (val > RWD.sm) this.drawer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(layout, navbar) {
  position: relative;
  height: 100%;
  @include setWidth($min: $xs);
  @include setFlex($jc: flex-start);
  padding: 0px 20px;

  @include shadow(0px 3px 10px -5px #666);
  // 首頁
  @include e(home) {
    cursor: pointer;
  }

  // 導覽
  @include e(nav) {
    margin-left: auto;
    @media (max-width: $sm) {
      display: none;
    }
  }
  // 更多
  @include e(more) {
    display: none;
    cursor: pointer;
    @media (max-width: $sm) {
      margin-left: auto;
      display: block;
    }
  }
}
</style>
