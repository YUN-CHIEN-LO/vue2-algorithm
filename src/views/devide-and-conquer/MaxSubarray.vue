<template>
  <div class="max-subarray">
    {{ sum }}
    <transition-group class="max-subarray__demo" name="list" tag="div">
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
  name: "MaxSubarray",
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
  data() {
    return {
      sum: 0,
    };
  },
  created() {
    this.$emit(
      "change:moves",
      this.maxSubarray(
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
      title: "Max Subarray",
      discription: "",
      code: `MAX-CROSS(A, low, mid, high)
left-sum = -INFINITY
sum = 0
for i = mid downto low
    sum = sum + A[i]
    if sum > left-sum
        left-sum = sum
        max-left = i
right-sum = -INFINITY
sum = 0
for j = mid + 1 to high
    sum = sum + A[j]
    if sum > right-sum
        right-sum = sum
        max-right = j
return (max-left, max-right, left-sum + right-sum)

MAX-SUB(A, low, high)
    if high == low
        return (low, high, A[low])
    else mid = [(low + high)/2]
        (left-low, left-high, left-sum) 
            = MAX-SUB(A, low, mid)
        (right-low, right-high, right-sum) 
            = MAX-SUB(A, mid + 1, high)
        (cross-low, cross-high, cross-sum) 
            = MAX-CROSS(A, low, mid, high)
    if left-sum >= right-sum and right-sum > cross-sum
        return (left-low, left-high, left-sum)
    elseif right-sum >= left-sum and left-sum >= cross-sum
        return (right-low, right-high, right-sum)
    else return (cross-low, cross-high, cross-sum)
      `,
      time: {
        average: "O(n^2)",
        best: "O(n)",
        worst: "O(n^2)",
      },
      nagativeRange: true,
    });
  },
  watch: {
    input(val) {
      this.$emit(
        "change:moves",
        this.maxSubarray(
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
    maxSubarray(array) {
      const { low, high, sum } = this.findMaxSubarray(
        array,
        0,
        array.length - 1
      );
      this.sum = sum;
      return [
        array.map((x) => {
          if (x.key >= low && x.key <= high) {
            x.highlight = true;
          }
          return x;
        }),
      ];
    },
    findMaxSubarray(array, low, high) {
      if (low === high) return { low: low, high: high, sum: array[low].value };
      else {
        const mid = Math.floor((low + high) / 2);
        const {
          low: leftLow,
          high: leftHigh,
          sum: leftSum,
        } = this.findMaxSubarray(array, low, mid);
        const {
          low: rightLow,
          high: rightHigh,
          sum: rightSum,
        } = this.findMaxSubarray(array, mid + 1, high);
        const {
          low: crossLow,
          high: crossHigh,
          sum: crossSum,
        } = this.findMaxCrossSubarray(array, low, mid, high);

        if (leftSum >= rightSum && rightSum >= crossSum)
          return { low: leftLow, high: leftHigh, sum: leftSum };
        if (rightSum >= leftSum && leftSum >= crossSum)
          return { low: rightLow, high: rightHigh, sum: rightSum };
        return {
          low: crossLow,
          high: crossHigh,
          sum: crossSum,
        };
      }
    },
    findMaxCrossSubarray(array, low, mid, high) {
      let leftSum, rightSum;
      let maxLeft = mid;
      let maxRight = mid;
      let sum = 0;
      for (let i = mid; i >= low; i--) {
        sum = sum + array[i].value;
        if (leftSum === undefined || sum > leftSum) {
          leftSum = sum;
          maxLeft = i;
        }
      }
      sum = 0;
      for (let j = mid + 1; j <= high; j++) {
        sum = sum + array[j].value;
        if (rightSum === undefined || sum > rightSum) {
          rightSum = sum;
          maxRight = j;
        }
      }
      return {
        low: maxLeft,
        high: maxRight,
        sum: leftSum + rightSum,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(max, subarray) {
  @include e(demo) {
    @include setFlex($fd: column);
  }
}
.list-move {
  transition: transform 0.5s;
}
</style>
