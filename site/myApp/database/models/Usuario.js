module.exports= (sequelize, dataType) => {

    const alias = 'Usuario';           //lo cambié de Usuarios a Usuario

    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: { 
            type: dataType.STRING,
            allowNull: false
        },
        last_name: { 
            type: dataType.STRING,
            allowNull: false
        },
        email: {
            type: dataType.STRING,
            allowNull: false
        },
        password: { 
            type: dataType.STRING,
            allowNull: false
        },
        category: { 
            type: dataType.STRING,
            allowNull: false
        },
        image: {
            type: dataType.STRING,
            allowNull: false
        }
    };
 
    const config = {
        tableName: 'usuarios',
        timestamps: false,
    }
 
    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models){
        Usuario.hasMany(models.Orden, {
            as: "ordenes",
            foreignKey: "id_user"
        });

    }    
    
    return Usuario;
} 