import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ArchiveService} from "../../services/archive.service";
import {ActivatedRoute} from "@angular/router";
import {PathContentComponent} from "../../components/path-content/path-content.component";

@Component({
  selector: 'la-gallery',
  templateUrl: './gallery.view.html',
  styleUrls: ['./gallery.view.css']
})
export class GalleryView implements OnInit, AfterViewInit {
  @ViewChild('content') content!: PathContentComponent;
  isLoaded = true;
  path: string = "\\";

  constructor(private archiveService: ArchiveService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
  }

  async reload(path: string | undefined = undefined) {
    this.content?.reload(path);
    this.path = path ?? "\\";

    this.isLoaded = false;
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  async ngAfterViewInit() {
    this.route.queryParams
      .subscribe(async (params) => await this.reload(params['path']));
  }
}
