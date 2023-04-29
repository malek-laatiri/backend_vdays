import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {HistoryRepository} from "../../history/src/history.repository";
import {SettingsRepository} from "./settings.repository";
import {CreateHistoryRequest} from "../../history/src/dto/create-history.request";
import {SettingsRequest} from "./dto/settings.request";

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(private readonly httpService: HttpService, private readonly settingsRepository: SettingsRepository) {
  }
  async save(request: SettingsRequest) {
    this.logger.log('saving settings...');
    try {
      const history = await this.settingsRepository.create(request);
      return history;
    } catch (err) {
      throw err;
    }
  }

  async update(request: SettingsRequest) {
    this.logger.log('saving settings...');
    try {
      const history = await this.settingsRepository.findOneAndUpdate({user:request.user},request);
      return history;
    } catch (err) {
      throw err;
    }
  }

  async get(request: SettingsRequest) {
    this.logger.log('saving settings...');
    try {
      const history = await this.settingsRepository.findOne({user:request.user});
      return history;
    } catch (err) {
      throw err;
    }
  }

}
