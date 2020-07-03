module.exports= (sequelize, dataType) => {

    const alias = 'Categorias';

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
        tablename: 'categorias',
        timestamps: false,
    };
 
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models){
        Categoria.hasMany(models.Productos, {
            as: 'productos',
            foreignKey: 'id_category'
        });

    };

    return Categoria;
 } 