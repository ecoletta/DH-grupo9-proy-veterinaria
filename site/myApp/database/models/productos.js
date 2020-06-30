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
     }
 
     return sequelize.define('Productos', cols, config);

     Productos.associate= function(productos){
        Productos.belongsTo(Categorias, {
            as: "categorias",
            foreignKey: "id_category"
        })

     }
 } 