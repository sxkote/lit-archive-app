import {environment} from "../../../environments/environment";

export type TypeArchiveItem = "Folder" | "File" | "Image" | "Video";

export class ArchiveItem {
  public type: TypeArchiveItem = "File";
  public path: string = "";
  public name: string = "";
  public extension?: string = "";
  public size?: number;

  public url?: string;
  public poster?: string;

  isFile(): boolean {
    return this.type === "File" || this.type == "Image" || this.type == "Video";
  }

  // private isDirectory(): boolean {
  //   return this.type === "Folder";
  // }
  //
  // private isImage(): boolean {
  //   const ext = this.extension?.toLowerCase() ?? "";
  //   return ext == ".jpg" || ext == ".jpeg" || ext == ".png";
  // }
  //
  // private isVideo(): boolean {
  //   const ext = this.extension?.toLowerCase() ?? "";
  //   return ext == ".mov" || ext == ".mpeg" || ext == ".mp4";
  // }

  constructor(data?: any, accessKey?: string) {
    if (!data) return;
    this.type = data.type;
    this.path = data.path;
    this.name = data.name;
    this.extension = data.extension;
    this.size = data.size;

    const access = accessKey ?? 'none';

    if (this.isFile()) {
      this.type = ArchiveItem.getFileType(this.extension);
      if (this.type == "Video") {
        this.poster = `${environment.apiUrl}archive/poster?path=${this.path}&access=${access}`;
      }

      if (accessKey) {
        this.url = `${environment.apiUrl}files/${this.path}?access=${access}`;
      }
    }
  }

  public static getExtension(path?: string): string {
    if (!path) return "";
    const lastPointIndex = path.lastIndexOf('.');
    const extension = (lastPointIndex > 0) ? path.substring(lastPointIndex).toLowerCase() : path.toLowerCase();
    console.log("Extension:", extension);
    return extension;
  }

  public static getFileType(path?: string): TypeArchiveItem {
    const extension = ArchiveItem.getExtension(path);
    switch (extension) {
      case ".jpg":
      case ".jpeg":
      case ".png":
      case ".bmp":
        return "Image";
      case ".mov":
      case ".mpeg":
      case ".mp4":
        return "Video"
      default:
        return "File";
    }
  }
}

export class ArchiveData {
  accessKey?: string;
  items: Array<ArchiveItem> = [];

  constructor(data?: any, accessKey?: string) {
    if (!data) return;

    this.accessKey = accessKey;

    if (data.items)
      this.items = data.items.map((i: any) => new ArchiveItem(i, this.accessKey));
  }
}
