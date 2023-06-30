import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {ArchiveData} from "../models/archive.model";

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  public _accessKey?: string;

  public get accessKey(): string | undefined {
    return this._accessKey;
  }


  constructor(protected backend: RestService) {
  }

  public async getAccessKey(): Promise<string> {
    return await this.backend.post('archive/access', null, { responseType: 'text' });
  }

  public async getArchiveData(path?: string): Promise<ArchiveData> {
    if (!this._accessKey)
      this._accessKey = await this.getAccessKey();

    const url = "archive?path=" + (path ? path : "/");
    const result = await this.backend.get(url);
    return new ArchiveData(result, this._accessKey);
  }
}
