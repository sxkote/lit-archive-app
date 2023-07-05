import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ArchiveService} from "../../services/archive.service";

@Component({
  selector: 'la-path-links',
  templateUrl: './path-links.component.html',
  styleUrls: ['./path-links.component.css']
})
export class PathLinksComponent implements OnInit {
  @Input() path!: string;
  @Input() isFile: boolean = false;

  pathMenu: MenuItem[] = [];

  constructor(private archiveService: ArchiveService) {
  }

  ngOnInit() {
    this.pathMenu = this.archiveService.buildPathMenu(this.path, this.isFile);
  }
}
