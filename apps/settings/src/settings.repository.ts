import {AbstractRepository} from "@app/common";
import {Logger} from "@nestjs/common";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from "mongoose";
import {Settings_user} from "./schemas/Settings_user.schema";

export class SettingsRepository extends AbstractRepository<Settings_user> {
    protected readonly logger = new Logger(SettingsRepository.name);

    constructor(@InjectModel(Settings_user.name) settingsUserModel: Model<Settings_user>, @InjectConnection() connection: Connection) {
        super(settingsUserModel, connection);
    }}