<template>
  <el-container>
    <el-header>
      <layout-navbar />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import LayoutNavbar from "./Navbar.vue";

export default {
  name: "LycLayout",
  components: { LayoutNavbar },
  mounted() {
    // 掛載監聽事件
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      window.addEventListener("scroll", this.onScroll);
      this.onResize();
    });
  },
  methods: {
    /**
     * 當 resize 時，更新 文件長 、 文件寬 與 視窗長
     */
    onResize() {
      // 更新vuex
      this.$store.dispatch("window/setWindowWidth", window.innerWidth);
    },
    /**
     * 當 scroll 時，更新 vuex isScroll 狀態
     */
    onScroll() {
      this.$store.dispatch(
        "window/setIsScroll",
        Math.floor(window.document.documentElement.scrollTop)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-header {
  padding: 0;
}
::v-deep .el-main {
  padding: 0;
}
</style>
