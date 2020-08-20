module.exports= (sequelize, dataType) => {

    const alias = 'Producto';

    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: { 
             type: dataType.STRING,
             allowNull: false
        },
        id_category: {
             type: dataType.INTEGER,
             allowNull: false
        },
        stock: {
             type: dataType.INTEGER,
             allowNull: false
        },
        price: {
             type: dataType.INTEGER,
             allowNull: false
        },
        discount: {
            type: dataType.INTEGER,
            allowNull: false
        },
        description: {
            type: dataType.STRING,
            allowNull: false
        },
        image: {
            type: dataType.STRING,
            allowNull: false
        }
    };
 
    const config = {
        tableName: 'productos',
        timestamps: false,
    };
 
    const Producto = sequelize.define(alias, cols, config);
    
    Producto.associate = function(models){
        Producto.belongsTo(models.Categoria, {
            as: "categorias",
            foreignKey: "id_category"
        });
        Producto.hasMany(models.Compra, {               //agregué para la relación con compras
            as: "compras",
            foreignKey: "id_product"
        })

    }    

    return Producto; 
} 