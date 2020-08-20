module.exports= (sequelize, dataType) => {

    const alias = 'Compra';

    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_orden: { 
             type: dataType.INTEGER,
             allowNull: false
        },
        id_product: {
             type: dataType.INTEGER,
             allowNull: false
        },
        total: {
            type: dataType.INTEGER,
            allowNull: false
       }
    };
 
    const config = {
        tableName: 'compras',
        timestamps: false,
    };
 
    const Compra = sequelize.define(alias, cols, config);
    
    Compra.associate = function(models){
        Compra.belongsTo(models.Orden, {
            as: "ordenes",
            foreignKey: "id_orden"
        })
        Compra.belongsTo(models.Producto, {
            as: "productos",
            foreignKey: "id_product"
        })
    }    

    return Compra; 
} 