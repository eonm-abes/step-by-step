export class Pm {
  info: PmInfo;
  collectionVariables: collectionVariables;
  constructor() {
    this.info = new PmInfo();
    this.collectionVariables = new collectionVariables();
  }
}

export class collectionVariables {
  collectionVariables: { [key: string]: string };

  constructor() {
    this.collectionVariables = {};
  }

  set(key: string, val: string) {
    this.collectionVariables[key] = JSON.parse(val);
  }

  get(key: string): string {
    return JSON.stringify(this.collectionVariables[key]);
  }

  unset(key: string) {
    delete this.collectionVariables[key];
  }
}

export class PmInfo {
  requestId: string;

  constructor() {
    this.requestId = "123e4567-e89b-12d3-a456-426614174000";
  }
}
