import { MenuRootItem } from "ontimize-web-ngx";
import { ProductsHomeComponent } from "../main/products/products-home/products-home.component";
import { SectionfoodHomeComponent } from "../main/sectionfood/sectionfood-home/sectionfood-home.component";

export const MENU_CONFIG: MenuRootItem[] = [
  { id: "home", name: "HOME", icon: "home", route: "/main/home" },
  {
    id: "sections",
    name: "SECTIONS",
    icon: "remove_red_eye",
    opened: false,
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
    id: "wholesaler",
    name: "WHOLESALER",
    icon: "sell",
    opened: false,
    items: [
      {
        id: "wholesaler-products",
        name: "WHOLESALER_PRODUCTS",
        tooltip: "WHOLESALER_PRODUCTS_TOOLTIP",
        route: "/main/wholesaler-products",
        icon: "inventory",
      },
      {
        id: "wholesaler_stats",
        name: "WHOLESALER_STATS",
        tooltip: "WHOLESALER_STATS_TOOLTIP",
        route: "/main/wholesaler-stats",
        icon: "bar_chart",
      },           
    ],
  }, 
  {
    id: "admnistration",
    name: "ADMINISTRATION",
    icon: "settings",
    opened: true,
    items: [
      {
        id: "categories",
        name: "CATEGORIES",
        tooltip: "CATEGORIES_TOOLTIP",
        route: "/main/categories",
        icon: "category",
      },
      {
        id: "allergens",
        name: "ALLERGENS",
        tooltip: "ALLERGENS_TOOLTIP",
        route: "/main/allergens",
        icon: "no_food",
      },
      {
        id: "products",
        name: "PRODUCTS",
        tooltip: "PRODUCTS_TOOLTIP",
        route: "/main/products",
        icon: "inventory_2",
      },      
    ],
  },  
  {
    id: "logout",
    name: "LOGOUT",
    route: "/login",
    icon: "power_settings_new",
    confirm: "yes",
  },  
];
