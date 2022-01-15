<template>
  <div class="merge-sort">
    <!-- 比較組 -->
    <div class="merge-sort__compare">
      <lyc-block
        v-for="item in input.map((x, index) => ({ key: index, value: x }))"
        :key="item.key"
        :disabled="setDisabled(item)"
      >
        {{ item.value }}
      </lyc-block>
    </div>
    <!-- 排序組 -->
    <transition-group class="merge-sort__demo" name="list" tag="div">
      <lyc-block
        v-for="item in moves[step]"
        :key="item.key"
        :highlight="item.highlight"
        :danger="item.danger"
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
  name: "MergeSort",
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
            danger: false,
          }))
        )
      )
    );
    this.$emit("change:page", {
      title: "Merge Sort",
      discription: "",
      code: `MERGE(A, p, q, r)
    x = q - p + 1
    y = r - q
    let L[1...x+1] and R[1...y+1] be new arrays
    for i = 1 to x
        L[i] = A[p + i - 1]
    for j = 1 to y
        R[j] = A[q + j]
    L[x + 1] = #
    R[y + 1] = #
    for k = p to r
        if L[i] <= R[j]
            A[k] = L[i]
            i = i + 1
        else
            A[k] = R[j]
            j = j + 1
MERGE-SORT(A, p, r)
    if p < r
        q = [(p + r)/2]
        MERGE-SORT(A, p, q)
        MERGE-SORT(A, q + 1, r)
        MERGE(A, p, q, r)
      `,
      time: {
        average: "O(n*log n)",
        best: "O(n*log n)",
        worst: "O(n*log n)",
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
              danger: false,
            }))
          )
        )
      );
    },
  },
  methods: {
    /**
     * 比較組是否顯示
     *
     * @param {object} item - 項目
     * @returns {boolean} - 是否顯示
     */
    setDisabled(item) {
      if (this.moves.length === 0) return false;
      return !this.moves[this.step].some((x) => x.key === item.key);
    },
    /**
     * 排序
     *
     * @param {array} data - data
     */
    sort(data) {
      let moves = [];

      const mergeSort = (data) => {
        moves.push(data);
        if (data.length === 1) return data;
        const middle = Math.ceil(data.length / 2);
        const front = mergeSort(data.slice(0, middle)).map((x) => ({
          ...x,
          highlight: true,
          danger: false,
        }));
        const back = mergeSort(data.slice(middle, data.length)).map((x) => ({
          ...x,
          highlight: false,
          danger: true,
        }));
        const merged = merge(front, back);
        moves.push(merged);
        return merged;
      };

      const merge = (front, back) => {
        let data = [];
        let f = 0;
        let b = 0;
        for (let i = 0; i < front.length + back.length; i++) {
          if (!front[f] || !back[b]) {
            if (front[f]) {
              data.push(front[f]);
              f++;
            } else if (back[b]) {
              data.push(back[b]);
              b++;
            }
          } else if (front[f].value < back[b].value) {
            data.push(front[f]);
            f++;
          } else {
            data.push(back[b]);
            b++;
          }
        }
        return data;
      };

      moves.push(
        mergeSort(data).map((x) => ({
          ...x,
          highlight: false,
          danger: false,
        }))
      );
      return moves;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(merge, sort) {
  @include setFlex($ai: flex-start);
  @include e(compare) {
    opacity: 0.5;
    @include setFlex($fd: column);
  }
  @include e(demo) {
    @include setFlex($fd: column);
  }
}
.list-move {
  transition: transform 0.3s;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-leave-active {
  position: absolute;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
