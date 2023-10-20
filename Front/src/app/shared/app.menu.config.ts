import { MenuRootItem } from "ontimize-web-ngx";
import { ProductsHomeComponent } from "../main/products/products-home/products-home.component";
import { SectionfoodHomeComponent } from "../main/sectionfood/sectionfood-home/sectionfood-home.component";

export const MENU_CONFIG: MenuRootItem[] = [
  { id: "home", name: "Página principal", icon: "home", route: "/main/home" },
  {
    id: "sections",
    name: "Secciones",
    icon: "list",
    opened: true,
    items: [
      {
        id: "food",
        name: "Comida",
        tooltip: "SECTION_FOOD_TOOLTIP",
        route: "/main/sectionfood",
        icon: "lunch_dining",
        image: "assets/images/ic_clientes.png",
        component: SectionfoodHomeComponent,
      },
      {
        id: "jointpurchase",
        name: "Compra conjunta",
        tooltip: "SECTION_JOINT_PURCHASE_TOOLTIP",
        route: "/main/jointpurchasesection",
        icon: "people",
        image: "assets/images/ic_clientes.png",
        component: ProductsHomeComponent,
      },
      {
        id: "general",
        name: "Tienda general",
        tooltip: "SECTION_GENERAL_STORE_TOOLTIP",
        route: "/main/generalstoresection",
        icon: "local_grocery_store",
        image: "assets/images/ic_clientes.png",
        component: ProductsHomeComponent,
      },
    ],
  },
  {
    id: "products",
    name: "Productos",
    icon: "product",
    route: "/main/products",
  },
  {
    id: "logout",
    name: "Cerrar sesión",
    route: "/login",
    icon: "power_settings_new",
    confirm: "yes",
  },  
  {
    id: "admnistration",
    name: "Administración",
    icon: "product",
    opened: true,
    items: [
      {
        id: "categories",
        name: "Categorías",
        tooltip: "CATEGORIES_TOOLTIP",
        route: "/main/categories",
        icon: "category",
      },
      {
        id: "allergens",
        name: "Alérgenos",
        tooltip: "ALLERGENS_TOOLTIP",
        route: "/main/allergens",
        icon: "do_disturb_alt",
      },
      {
        id: "products",
        name: "Productos",
        tooltip: "PRODUCTS_TOOLTIP",
        route: "/main/products",
        icon: "inventory_2",
      },    
      {
        id: "users",
        name: "Usuarios",
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
];
