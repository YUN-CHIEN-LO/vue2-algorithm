<template>
  <el-container class="layout-page">
    <!-- 左側選單 -->
    <el-aside
      class="layout-page__side"
      :width="openSidebar ? sidebarWidth : '0px'"
      :style="openSidebar ? sidebarStyle : {}"
    >
      <!-- 標題 -->
      <h4 class="layout-page__title">{{ info.title }}</h4>
      <!-- 敘述 -->
      <p class="layout-page__discription">{{ info.discription }}</p>
      <el-collapse v-model="activeNames" accordion>
        <!-- 時間複雜度 -->
        <el-collapse-item title="時間複雜度" name="info">
          <el-input :value="info.time.average" readonly>
            <template slot="prepend">平均 O(n)</template>
          </el-input>
          <el-input :value="info.time.best" readonly>
            <template slot="prepend">最佳 O(n)</template>
          </el-input>
          <el-input :value="info.time.worst" readonly>
            <template slot="prepend">最差 O(n)</template>
          </el-input>
        </el-collapse-item>
        <el-collapse-item title="Psuedo Code" name="code">
          <pre> {{ info.code }} </pre>
        </el-collapse-item>
        <!-- 輸入選項 -->
        <el-collapse-item title="輸入選項" name="input">
          <!-- 快速輸入 -->
          <div class="layout-page__row">
            <el-button @click="simpleInput">快速輸入</el-button>
            <el-button @click="randomInput">隨機輸入</el-button>
          </div>
          <!-- 數字輸入 -->
          <el-input v-model.number="num" type="number"></el-input>
          <!-- 輸入工具 -->
          <div class="layout-page__row">
            <!-- 新增 -->
            <el-button
              icon="el-icon-circle-plus-outline"
              @click="pushInput"
              circle
            ></el-button>
            <!-- 移除 -->
            <el-button
              icon="el-icon-remove-outline"
              @click="popInput"
              circle
            ></el-button>
            <!-- 清空 -->
            <el-button
              icon="el-icon-circle-close"
              @click="clearInput"
              circle
            ></el-button>
            <!-- 輸入 -->
            <el-button
              type="success"
              icon="el-icon-check"
              @click="assignInput"
              circle
            ></el-button>
          </div>
          {{ input }}
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <!-- Demo 區域 -->
    <el-main
      class="layout-page__main"
      :style="isMobile ? { minWidth: '100vw' } : {}"
    >
      <!-- 工具列 -->
      <div class="layout-page__tool">
        <!-- 步數 -->
        <h3>
          {{ step + 1 }}
        </h3>
        <!-- 播放 -->
        <el-button @click="playStep" :icon="'el-icon-video-play'" circle>
        </el-button>
        <!-- 復原 -->
        <el-button
          :disabled="isPlaying"
          @click="step = 0"
          :icon="'el-icon-refresh-left'"
          circle
        >
        </el-button>
        <!-- 上一步 -->
        <el-button
          :disabled="step === 0 || isPlaying"
          @click="showStep(-1)"
          :icon="'el-icon-back'"
          circle
        ></el-button>
        <!-- 下一步 -->
        <el-button
          :disabled="step === moves.length - 1 || isPlaying"
          @click="showStep(1)"
          :icon="'el-icon-right'"
          circle
        ></el-button>
      </div>
      <!-- 元件 -->
      <component
        :is="mapAlgo['insertionSort']"
        :input="inputSlot"
        :step="step"
        :moves="moves"
        @change:moves="changeMoves"
        @change:page="changePage"
      />
    </el-main>
    <!-- 右側選單收合展開 -->
    <div class="layout-page__toggle">
      <el-button
        :icon="openSidebar ? 'el-icon-s-opportunity' : 'el-icon-info'"
        circle
        @click="openSidebar = !openSidebar"
      ></el-button>
    </div>
  </el-container>
</template>

<script>
import { RWD } from "@/utils";
import InsertionSort from "./InsertionSort.vue";
const mapAlgo = {
  insertionSort: InsertionSort,
};
export default {
  name: "LayoutPage",
  computed: {
    isMobile() {
      return this.$store.getters.windowWidth < RWD.sm;
    },
    sidebarWidth() {
      if (this.$store.getters.windowWidth < RWD.sm) {
        return "100%";
      } else {
        return "300px";
      }
    },
    sidebarStyle() {
      return {
        padding: "20px",
      };
    },
  },
  data() {
    return {
      info: {
        title: "",
        discription: "",
        code: "",
        time: {
          average: "",
          best: "",
          worst: "",
        },
      },
      mapAlgo: mapAlgo,
      step: 0,
      moves: [],
      isPlaying: false,
      num: 1,
      input: [],
      inputSlot: [3, 2, 5, 4, 1],
      activeNames: "info",
      openSidebar: !this.isMobile,
    };
  },
  watch: {
    isMobile(val) {
      if (!val) {
        this.openSidebar = true;
      }
    },
  },
  methods: {
    /**
     * 切換頁面資訊
     *
     * @param {object} info - 頁面資訊Ｆ
     */
    changePage(info) {
      this.info = info;
    },
    //#region 輸入Input
    /**
     * 快速輸入
     */
    simpleInput() {
      this.input = [3, 2, 5, 4, 1];
      this.assignInput();
    },
    /**
     * 隨機輸入
     */
    randomInput() {
      this.input = [];
      for (let i = 0; i < 10; i++) {
        this.input.push(Math.floor(Math.random() * 100));
      }
      this.assignInput();
    },
    /**
     * 新增輸入
     */
    pushInput() {
      if (this.num) this.input.push(this.num);
      this.num = null;
    },
    /**
     * 刪除輸入
     */
    popInput() {
      this.input.pop();
    },
    /**
     * 清空輸入
     */
    clearInput() {
      this.input = [];
      this.inputSlot = [];
    },
    /**
     * 指定輸入
     */
    assignInput() {
      this.inputSlot = this.input;
      this.step = 0;
      if (this.isMobile) {
        const timer = setTimeout(() => {
          this.openSidebar = false;
          clearTimeout(timer);
        }, 500);
      }
    },
    //#endregion
    //#region 顯示步驟
    /**
     * 覆寫步驟
     * @param {array} moves - 步驟Ｆ
     */
    changeMoves(moves) {
      this.moves = moves;
    },
    /**
     * 播放步驟
     */
    playStep() {
      this.isPlaying = true;
      this.step = 0;
      const _ = this;
      const timer = (ms) => new Promise((res) => setTimeout(res, ms));

      async function load() {
        await timer(500);
        for (var i = 0; i < _.moves.length; i++) {
          console.log(i);
          _.showStep(1);
          await timer(500);
        }
        _.isPlaying = false;
      }

      load();
    },
    /**
     * 切換步驟
     */
    showStep(step) {
      if (0 <= this.step + step && this.step + step < this.moves.length)
        this.step = this.step + step;
    },
    /**
     * 等待
     *
     * @param {number} milliseconds - 等待毫秒Ｆ
     */
    syncDelay(milliseconds) {
      let start = new Date().getTime();
      let end = 0;
      while (end - start < milliseconds) {
        end = new Date().getTime();
      }
      return;
    },
    //#endregion
  },
};
</script>

<style lang="scss" scoped>
@include b(layout, page) {
  @include e(row) {
    @include setFlex();
  }
  @include e(main) {
    padding: 20px;
  }
  @include e(tool) {
    @include setFlex();
    & h3 {
      margin-right: auto;
    }
  }
  @include e(side) {
    transition-duration: 0.3s;
    @include shadow(3px 0px 10px -5px #666);
    // padding: 10px 20px;
    min-height: calc(100vh - $header);
    @media (max-width: $sm) {
      // padding: 10px 0px;
    }
  }
  @include e(title) {
    text-align: center;
  }
  @include e(discription) {
    text-align: center;
    @media (min-width: $md) {
      white-space: pre-wrap;
    }
  }
  @include e(toggle) {
    display: none;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 500;
    @media (max-width: $sm) {
      display: block;
    }
  }
  ::v-deep .el-input {
    margin: 5px 0;
  }
}
</style>
