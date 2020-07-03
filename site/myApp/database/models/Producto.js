module.exports= (sequelize, dataType) => {

    const alias = 'Productos';

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
        tablename: 'productos',
        timestamps: false,
    };
 
    const Producto = sequelize.define(alias, cols, config);
    
    Producto.associate = function(models){
        Producto.belongsTo(models.Categorias, {
            as: "categorias",
            foreignKey: "id_category"
        });

    }    

    return Producto; 
} 