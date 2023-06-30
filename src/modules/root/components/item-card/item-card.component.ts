import {Component, Input} from '@angular/core';
import {ArchiveItem} from "../../models/archive.model";

@Component({
  selector: 'la-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input() item!: ArchiveItem;
  @Input() route: string = "/";
}
