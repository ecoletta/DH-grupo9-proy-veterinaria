module.exports= (sequelize, dataType) => {
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
     }
 
     return sequelize.define('Categorias', cols, config);
 } 