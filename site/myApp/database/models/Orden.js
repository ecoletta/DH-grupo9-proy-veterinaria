module.exports= (sequelize, dataType) => {

    const alias = 'Orden';

    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        date: { 
             type: dataType.DATE,
             allowNull: false
        },
        id_user: {
             type: dataType.INTEGER,
             allowNull: false
        }
    };
 
    const config = {
        tableName: 'ordenes',
        timestamps: false,
    };
 
    const Orden = sequelize.define(alias, cols, config);
    
    Orden.associate = function(models){
        Orden.belongsTo(models.Usuario, {
            as: "usuarios",
            foreignKey: "id_user"
        });

    }    

    return Orden; 
} 