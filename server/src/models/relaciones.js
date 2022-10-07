import Product from "../models/productos.models.js";
import Type from "../models/tiporecetas.models.js";
import List from "../models/listacompras.models.js";
import User from "../models/usuarios.models.js";
import Recipes from "../models/recetas.models.js";
import relacionListasProductos from "../models/relacionlistasproductos.models.js";
import relacionProductosRecetas from "../models/relacionproductosrecetas.models.js";
import relacionProductosPromedio from "../models/relacionproductospromedio.models.js";
import Price from "../models/promedioprecios.models.js";
import ProductosCompra from "./productoscompra.models.js";
import ProductosLista from "../models/productoslista.models.js";

//Relacion de muchos a muchos entre listacompras y productosLista
ProductosLista.belongsToMany(List, {
  through: relacionListasProductos,
  unique: false,
  as: "Listas",
});
List.belongsToMany(ProductosLista, {
  through: relacionListasProductos,
  unique: false,
  as: "Productos",
});

//Relacion de muchos a muchos entre recetas y productosCompra
Recipes.belongsToMany(ProductosCompra, {
  through: relacionProductosRecetas,
  unique: false,
  as: "Productos",
});

ProductosCompra.belongsToMany(Recipes, {
  through: relacionProductosRecetas,
  unique: false,
  as: "Recetas",
});

//Relacion de muchos a muchos entre productos y promedioprecios
Product.belongsToMany(Price, {
  through: relacionProductosPromedio,
  unique: false,
  as: "Promedio",
});

Price.belongsToMany(Product, {
  through: relacionProductosPromedio,
  unique: false,
  as: "Producto",
});

//Relacion de uno a muchos entre TipoRecetas y Recetas
Type.hasMany(Recipes, {
  foreignKey: "tiporecetasId",
  sourceKey: "id",
  as: "Receta",
});
Recipes.belongsTo(Type, {
  foreignKey: "tiporecetasId",
  targetId: "id",
  as: "Tiporeceta",
});

//Relacion de uno a muchos entre usuarios y listas de compras
User.hasMany(List, { as: "Listas", foreignKey: "userId", sourceKey: "id" });
List.belongsTo(User, { as: "Users", foreignKey: "userId", targetId: "id" });
