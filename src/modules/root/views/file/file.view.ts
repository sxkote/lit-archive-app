import {Component, OnInit} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ArchiveService} from "../../services/archive.service";
import {environment} from "../../../../environments/environment";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ArchiveItem} from "../../models/archive.model";

@Component({
  selector: 'la-file',
  templateUrl: './file.view.html',
  styleUrls: ['./file.view.scss']
})
export class FileView implements OnInit {
  path?: string;
  type?: string;
  access?: string;
  url?: SafeResourceUrl;


  constructor(private route: ActivatedRoute,
              private archiveService: ArchiveService,
              private sanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    const params = await firstValueFrom(this.route.queryParams);
    this.path = params['path'];
    if (!this.path)
      return;

    this.type = ArchiveItem.getFileType(this.path);
    this.access = await this.archiveService.getAccessKey();
    const fileUrl = `${environment.apiUrl}files/${this.path}?access=${this.access}`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
  }
}
