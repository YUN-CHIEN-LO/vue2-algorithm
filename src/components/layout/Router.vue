<template>
  <div class="layout-router" :class="`is-${direction}`">
    <div class="layout-router__link" @click="to('/sort')">Sort</div>
    <div class="layout-router__link" @click="to('/devide_and_conquer')">
      Devide and Conquer
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutRouter",
  props: {
    direction: {
      type: String,
      default: "horizontal",
    },
  },
  methods: {
    /**
     * 轉導路由
     * @param {string} route - 路由
     */
    to(route) {
      this.$emit("close");
      this.$router.push(route);
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(layout, router) {
  @include setFlex($jc: flex-start);

  // 路由
  @include e(link) {
    cursor: pointer;
    padding: 10px;
  }

  // 直式排版
  @include when(vertical) {
    flex-direction: column;
  }
}
</style>
