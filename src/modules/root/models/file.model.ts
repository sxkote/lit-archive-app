export class FileModel {
  public id: string = "";
  public fileName: string = "";
  public size: number = 0;

  constructor(data: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class FileData {
  fileName: string = "";
  data: File | undefined;

  get name(): string {
    return this.fileName;
  }

  isEmpty(): boolean {
    return !this.data;
  }

  copy(toFileData: FileData) {
    if (!toFileData)
      return;
    Object.assign(toFileData, this);
  }

  clear() {
    this.fileName = "";
    this.data = undefined;
  }

  static build(file: File): FileData {
    if (!file)
      return new FileData();

    let result = new FileData();
    result.fileName = file.name;
    result.data = file;
    return result;
  }
}
