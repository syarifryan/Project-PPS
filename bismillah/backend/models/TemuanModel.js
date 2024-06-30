import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Temuan = db.define('temuan',{
    name: DataTypes.STRING,
    identity: DataTypes.STRING,
    desc: DataTypes.STRING,
    location: DataTypes.STRING,
    dateFound: DataTypes.DATE,
    image: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Temuan;

(async()=>{
    await db.sync();
})();