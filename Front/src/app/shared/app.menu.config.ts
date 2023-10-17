import { MenuRootItem } from "ontimize-web-ngx";
import { ProductsHomeComponent } from "../main/products/products-home/products-home.component";
import { SectionfoodHomeComponent } from "../main/sectionfood/sectionfood-home/sectionfood-home.component";

export const MENU_CONFIG: MenuRootItem[] = [
<<<<<<< HEAD
<<<<<<< Updated upstream
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'products', name: 'PRODUCTS', icon: 'product', route: '/main/products' },
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' }
=======
=======
>>>>>>> SPRINT01
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
<<<<<<< HEAD
  },  
  {
    id: "admnistration",
    name: "ADMINISTRATION",
    icon: "product",
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
      {
        id: "users",
        name: "USERS",
        tooltip: "USERS_TOOLTIP",
        route: "/main/users",
        icon: "people",
      },
      {
        id: "roles",
        name: "ROLES",
        tooltip: "ROLES_TOOLTIP",
        route: "/main/roles",
        icon: "people",
      },
      {
        id: "permissions",
        name: "PERMISSIONS",
        tooltip: "PERMISSIONS_TOOLTIP",
        route: "/main/permissions",
        icon: "people",
      },
      {
        id: "clients",
        name: "CLIENTS",
        tooltip: "CLIENTS_TOOLTIP",
        route: "/main/clients",
        icon: "people",
      },
      {
        id: "suppliers",
        name: "SUPPLIERS",
        tooltip: "SUPPLIERS_TOOLTIP",
        route: "/main/suppliers",
        icon: "people",
      },           
    ],
  },
>>>>>>> Stashed changes
=======
  },
>>>>>>> SPRINT01
];
