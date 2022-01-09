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
      },
    ],
  },
  {
    // 首頁
    path: "/",
    component: LycLayout,
    children: [
      { name: "PageHome", path: "", component: () => import("@/views/Home") },
    ],
  },
];

const constantRoutes = basicRoutes;

export { constantRoutes };
