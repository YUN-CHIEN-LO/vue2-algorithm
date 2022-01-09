<template>
  <div class="insertion-sort">
    <transition-group class="insertion-sort__demo" name="flip-list" tag="div">
      <lyc-block v-for="item in moves[step]" :key="item.key">
        {{ item.value }}
      </lyc-block>
    </transition-group>
  </div>
</template>

<script>
import LycBlock from "@/components/Block.vue";
import { cloneDeep } from "lodash";
export default {
  name: "InsertionSort",
  components: { LycBlock },
  props: {
    input: {
      type: Array,
      default: () => [3, 2, 5, 4, 1],
      validator: function (value) {
        return !value.some(isNaN);
      },
    },
    step: {
      type: Number,
      default: 0,
    },
    moves: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.$emit(
      "change:moves",
      this.sort(
        cloneDeep(this.input.map((x, index) => ({ key: index, value: x })))
      )
    );
    this.$emit("change:page", {
      title: "Insertion Sort",
      discription: "",
      code: `INSERTION-SORT(A)
    for j = 2 to A.length
        key = A[j]
        // 插入A[j]
        i = j - 1
        while i > 0 and A[i] > key
            A[i + 1] = A[i]
            i = i - 1
        A[i + 1] = key
      `,
      time: {
        average: "O(n^2)",
        best: "O(n)",
        worst: "O(n^2)",
      },
    });
  },
  watch: {
    input(val) {
      this.$emit(
        "change:moves",
        this.sort(cloneDeep(val.map((x, index) => ({ key: index, value: x }))))
      );
    },
  },
  methods: {
    /**
     * 排序
     *
     * @param {array} data - data
     */
    sort(data) {
      const moves = [cloneDeep(data)];
      for (let j = 1; j < data.length; j++) {
        const key = cloneDeep(data[j]);
        let i = j - 1;
        while (i >= 0 && data[i].value > key.value) {
          data[i + 1] = cloneDeep(data[i]);
          i = i - 1;
        }
        data[i + 1] = cloneDeep(key);
        moves.push(cloneDeep(data));
      }
      return moves;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(insertion, sort) {
  @include e(demo) {
    @include setFlex($fd: column);
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>
