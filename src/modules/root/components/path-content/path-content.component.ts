import {Component, Input} from '@angular/core';
import {ArchiveService} from "../../services/archive.service";
import {ArchiveItem} from "../../models/archive.model";

@Component({
  selector: 'la-path-content',
  templateUrl: './path-content.component.html',
  styleUrls: ['./path-content.component.css']
})
export class PathContentComponent {
  @Input() route: string = "/";

  path: string = "";
  items: ArchiveItem[] = [];

  constructor(private archiveService: ArchiveService) {
  }

  isRoot(): boolean {
    return this.path == "" || this.path == "/";
    //return this.path.indexOf("/", 1) < 0;
  }

  getParentPath(): string {
    const index = this.path.lastIndexOf("/");
    if (index > 0)
      return this.path.substring(0, index);
    return "/";
  }

  async reload(path: string | undefined) {
    this.path = !!path ? path : "/";
    this.items = this.isRoot() ? [] : [new ArchiveItem({
      type: "Folder",
      path: this.getParentPath(),
      name: ".."
    })];

    const data = await this.archiveService.getArchiveData(this.path);
    const sorted = data.items.sort((a, b) => {
      if (a.type == "Folder")
        return b.type == "Folder" ? (a.path < b.path ? -1 : 1) : -1;
      if (b.type == "Folder")
        return 1;
      return a.path < b.path ? -1 : 1;
    });

    this.items.push(...sorted);
  }
}
