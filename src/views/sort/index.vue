<template>
  <div class="page-roadmap">
    <h1>排序 Sort</h1>
    <div class="page-roadmap__block__wrapper">
      <div class="page-roadmap__block" @click="$router.push('/sort/insertion')">
        <p>Insertion Sort</p>
      </div>
      <div class="page-roadmap__block" @click="$router.push('/sort/bubble')">
        <p>Bubble Sort</p>
      </div>
      <div class="page-roadmap__block" @click="$router.push('/sort/merge')">
        <p>Merge Sort</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageSort",
};
</script>
