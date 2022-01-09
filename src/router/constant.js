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
          title: "error",
        },
      },
    ],
  },
];

const constantRoutes = basicRoutes;

export { constantRoutes };
