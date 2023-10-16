import { MenuRootItem } from "ontimize-web-ngx";
import { ProductsHomeComponent } from "../main/products/products-home/products-home.component";
import { SectionfoodHomeComponent } from "../main/sectionfood/sectionfood-home/sectionfood-home.component";

export const MENU_CONFIG: MenuRootItem[] = [
  { id: "home", name: "HOME", icon: "home", route: "/main/home" },
  {
    id: "sections",
    name: "SECTIONS",
    icon: "remove_red_eye",
    opened: true,
    items: [
      {
        id: "food",
        name: "SECTION_FOOD",
        tooltip: "SECTION_FOOD_TOOLTIP",
        route: "/main/sectionfood",
        icon: "people",
        image: "assets/images/ic_clientes.png",
        component: SectionfoodHomeComponent,
      },
      {
        id: "jointpurchase",
        name: "SECTION_JOINT_PURCHASE",
        tooltip: "SECTION_JOINT_PURCHASE_TOOLTIP",
        route: "/main/jointpurchasesection",
        icon: "people",
        image: "assets/images/ic_clientes.png",
        component: ProductsHomeComponent,
      },
      {
        id: "general",
        name: "SECTION_GENERAL_STORE",
        tooltip: "SECTION_GENERAL_STORE_TOOLTIP",
        route: "/main/generalstoresection",
        icon: "people",
        image: "assets/images/ic_clientes.png",
        component: ProductsHomeComponent,
      },
    ],
  },
  {
    id: "products",
    name: "PRODUCTS",
    icon: "product",
    route: "/main/products",
  },
  {
    id: "logout",
    name: "LOGOUT",
    route: "/login",
    icon: "power_settings_new",
    confirm: "yes",
  },
];
