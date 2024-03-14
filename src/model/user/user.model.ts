import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection';
import { Role } from "./role.enum";
import { pbkdf2Sync, randomBytes } from "crypto";

export class UserModel extends Model {

    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public hash!: string;
    public salt!: string;
    public role!: Role;
    public isActive!: boolean;

    createPassword(password: string) {
        this.salt = randomBytes(16).toString('hex');
        this.hash = pbkdf2Sync(password, this.salt, 2000, 254, 'sha512').toString('hex');
    };

    validatePassword(password: string) {
        const hash = pbkdf2Sync(password, this.salt, 2000, 254, 'sha512').toString('hex');
        return this.hash === hash;
    }

    publicData() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            role: this.role,
            isActive: this.isActive
        };
    }
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