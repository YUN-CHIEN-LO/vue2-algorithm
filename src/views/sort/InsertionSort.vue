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
      let tempMove = cloneDeep(data);
      tempMove[0].highlight = true;
      const moves = [tempMove];
      for (let j = 1; j < data.length; j++) {
        const key = cloneDeep(data[j]);
        tempMove = cloneDeep(data);
        tempMove[j].highlight = true;

        for (let k = 0; k < j; k++) {
          tempMove[k].disabled = true;
        }
        moves.push(tempMove);

        let i = j - 1;

        while (i >= 0 && data[i].value > key.value) {
          data[i + 1] = cloneDeep(data[i]);
          i = i - 1;
        }

        data[i + 1] = cloneDeep(key);
        tempMove = cloneDeep(data);
        for (let k = 0; k < j + 1; k++) {
          tempMove[k].disabled = true;
        }
        tempMove[i + 1].disabled = false;
        tempMove[i + 1].highlight = true;
        moves.push(tempMove);
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
