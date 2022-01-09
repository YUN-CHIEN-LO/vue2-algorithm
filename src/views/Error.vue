<template>
  <div class="page-error">Error</div>
</template>

<script>
export default {
  name: "PageError",
};
</script>

<style lang="scss" scoped>
@include b(page, error) {
  background-color: yellow;
}
</style>
