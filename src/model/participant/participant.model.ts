import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/connection";

export class ParticipantModel extends Model {}

ParticipantModel.init({
    discordId: {
        type: DataTypes.STRING,
        field: 'discord_id',
        primaryKey: true,
        allowNull: false
    },
    discordUsername: {
        type: DataTypes.STRING,
        field: 'discord_username',
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    }
}, {
    sequelize,
    modelName: 'participants',
    createdAt: "created_at",
    updatedAt: "updated_at",
});

