import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {APP_CONFIGURATION, AppConfiguration, BackendService} from "lbox-shared";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class RestService extends BackendService {

  constructor(@Inject(APP_CONFIGURATION) protected override config: AppConfiguration,
              protected override httpClient: HttpClient) {
    super(config, httpClient);
    this.apiUrl = environment.apiUrl;
  }

  protected override buildUrl(url: string): string {
    return this.apiUrl + url;
  }
}
