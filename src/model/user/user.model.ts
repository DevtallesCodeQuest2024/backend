import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection';
import { Role } from "./role.enum";

export class UserModel extends Model {

}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        allowNull: false
    },
    lastName:  {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING(1234),
    },
    salt: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM,
        values: Object.values(Role),
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
});