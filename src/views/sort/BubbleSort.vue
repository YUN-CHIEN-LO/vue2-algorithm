<template>
  <div class="insertion-sort">
    <transition-group class="insertion-sort__demo" name="list" tag="div">
      <lyc-block
        v-for="item in moves[step]"
        :key="item.key"
        :highlight="item.highlight"
        :disabled="item.disabled"
      >
        {{ item.value }}
      </lyc-block>
    </transition-group>
  </div>
</template>

<script>
import LycBlock from "@/components/Block.vue";
import { cloneDeep } from "lodash";
export default {
  name: "BubbleSort",
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
        cloneDeep(
          this.input.map((x, index) => ({
            key: index,
            value: x,
            highlight: false,
            disabled: false,
          }))
        )
      )
    );
    this.$emit("change:page", {
      title: "Bubble Sort",
      discription: "",
      code: `BUBBLE-SORT(A)
    for i = 1 to A.length - 1
        for j = A.length downto i + 1
            if A[j] < A[j - 1]
                exchange A[j] with A[j - a]
      `,
      time: {
        average: "O(n^2)",
        best: "O(n)",
        worst: "O(n^2)",
      },
      nagativeRange: false,
    });
  },
  watch: {
    input(val) {
      this.$emit(
        "change:moves",
        this.sort(
          cloneDeep(
            val.map((x, index) => ({
              key: index,
              value: x,
              highlight: false,
              disabled: false,
            }))
          )
        )
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
      let tempMove = data.map((x) => ({ ...x, disabled: true }));
      moves.push(tempMove);
      for (let i = 0; i < data.length; i++) {
        for (let j = data.length - 1; j > i; j--) {
          tempMove = data.map((x) => ({ ...x, disabled: true }));
          tempMove[i].highlight = true;
          tempMove[j].disabled = false;
          moves.push(tempMove);
          if (data[j].value < data[j - 1].value) {
            [data[j], data[j - 1]] = [data[j - 1], data[j]];
            tempMove = data.map((x) => ({ ...x, disabled: true }));
            tempMove[i].highlight = true;
            tempMove[j].disabled = false;
            tempMove[j - 1].disabled = false;
            moves.push(tempMove);
          }
        }
      }
      moves.push(cloneDeep(data));
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
.list-move {
  transition: transform 0.5s;
}
</style>
