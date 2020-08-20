module.exports= (sequelize, dataType) => {

    const alias = 'Categoria';

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
         }
    };
 
    const config = {
        tableName: 'categorias',
        timestamps: false,
    };
 
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models){
        Categoria.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'id_category'
        });

    };

    return Categoria;
 } 