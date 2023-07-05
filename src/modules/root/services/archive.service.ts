import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {ArchiveData} from "../models/archive.model";
import {MenuItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  public _accessKey?: string;

  constructor(protected backend: RestService) {
  }

  public async getAccessKey(): Promise<string> {
    // refresh access key if needed
    if (!this._accessKey)
      this._accessKey = await this.refreshAccessKey();

    return this._accessKey;
  }

  public async refreshAccessKey(): Promise<string> {
    return await this.backend.post('archive/access', null, {responseType: 'text'});
  }

  public async getArchiveData(path?: string): Promise<ArchiveData> {
    const accessKey = await this.getAccessKey();
    const url = "archive?path=" + (path ? path : "/");
    const result = await this.backend.get(url);
    return new ArchiveData(result, accessKey);
  }

  public buildPathMenu(path?: string, isFile: boolean = false): MenuItem[] {
    const result: MenuItem[] = [];
    result.push({icon: 'bi bi-house-fill', routerLink: '/'});

    if (!path || path == "/" || path == "\\")
      return result;

    const pathItems = path.split('/');
    console.log(pathItems);
    const currentPath: string[] = [];
    for (let i = 0; i < pathItems.length; i++) {
      currentPath.push(pathItems[i]);
      if (!pathItems[i]) continue;
      if (i == pathItems.length - 1 && isFile)
        result.push({label: pathItems[i], routerLink: ["/file"], queryParams: {path: currentPath.join('/')}})
      else
        result.push({label: pathItems[i], routerLink: ["/"], queryParams: {path: currentPath.join('/')}})
    }

    return result;
  }
}
