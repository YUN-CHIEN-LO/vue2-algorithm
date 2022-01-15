<template>
  <div class="page-roadmap">
    <h1>Devide and Conquer</h1>
    <div class="page-roadmap__block__wrapper">
      <div class="page-roadmap__block" @click="$router.push('/sort/merge')">
        <p>Merge Sort</p>
      </div>
      <div
        class="page-roadmap__block"
        @click="$router.push('/devide_and_conquer/max_subarray')"
      >
        <p>Max Subarray</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageDevideAndConquer",
};
</script>
