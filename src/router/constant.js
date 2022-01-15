import LycLayout from "../components/layout/index.vue";
// 基礎路由
const basicRoutes = [
  {
    // 錯誤頁
    path: "/error",
    component: LycLayout,
    children: [
      {
        name: "PageError",
        path: "",
        component: () => import("@/views/Error"),
        meta: {
          noPage: true,
        },
      },
    ],
  },
  {
    // 首頁
    path: "/",
    component: LycLayout,
    children: [
      {
        name: "PageHome",
        path: "",
        component: () => import("@/views/Home"),
        meta: {
          noPage: true,
        },
      },
    ],
  },
  {
    // Sort
    path: "/sort",
    component: LycLayout,
    children: [
      {
        name: "PageSort",
        path: "",
        component: () => import("@/views/sort/index.vue"),
        meta: {
          noPage: true,
        },
      },
      {
        name: "SortInsertion",
        path: "insertion",
        component: () => import("@/views/Page"),
        meta: {
          key: "insertionSort",
          title: "Insertion Sort",
        },
      },
      {
        name: "SortMerge",
        path: "merge",
        component: () => import("@/views/Page"),
        meta: {
          key: "mergeSort",
          title: "Merge Sort",
        },
      },
      {
        name: "SortBubble",
        path: "bubble",
        component: () => import("@/views/Page"),
        meta: {
          key: "bubbleSort",
          title: "BubbleSort",
        },
      },
    ],
  },
  {
    // Devide and Conquer
    path: "/devide_and_conquer",
    component: LycLayout,
    children: [
      {
        name: "PageDevideAndConquer",
        path: "",
        component: () => import("@/views/devide-and-conquer/index.vue"),
        meta: {
          noPage: true,
        },
      },
      {
        name: "MaxSubarray",
        path: "max_subarray",
        component: () => import("@/views/Page"),
        meta: {
          key: "maxSubarray",
          title: "MaxSubarray",
        },
      },
    ],
  },
];

const constantRoutes = basicRoutes;

export { constantRoutes };
