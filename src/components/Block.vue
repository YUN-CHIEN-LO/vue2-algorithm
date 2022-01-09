<template>
  <div class="lyc-block">
    <div class="lyc-block__wrapper">
      <p>
        <slot>{{ value }}</slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LycBlock",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(lyc, block) {
  display: inline-block;
  min-width: 150px;
  min-height: 30px;
  border: solid 3px #666;
  margin: 5px;
  @include e(wrapper) {
    @include setFlex();
    width: 100%;
    height: 100%;
    min-height: 30px;
  }
}
</style>
