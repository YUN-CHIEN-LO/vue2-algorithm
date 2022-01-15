<template>
  <div
    class="lyc-block"
    :class="{
      'is-disabled': disabled,
      'is-highlight': highlight,
      'is-danger': danger,
    }"
  >
    <div class="lyc-block__wrapper">
      <p>
        <slot> {{ value }}</slot>
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
    disabled: {
      type: Boolean,
      default: false,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
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
  transition-duration: 0.3s;
  @include e(wrapper) {
    @include setFlex();
    width: 100%;
    height: 100%;
    min-height: 30px;
  }
  @include when(disabled) {
    border: solid 3px #ccc;
    & p {
      color: #ccc;
    }
  }
  @include when(highlight) {
    border: solid 3px teal;
    & p {
      color: teal;
    }
  }
  @include when(danger) {
    border: solid 3px salmon;
    & p {
      color: salmon;
    }
  }
}
</style>
