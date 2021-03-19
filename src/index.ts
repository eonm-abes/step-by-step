// #!ENV
import { Pm } from './pm'

// #!ENV
let pm = new Pm();

interface cachedData {
  count: number;
  results: Array<any>;
  [key: string]: any;
}

export class stepByStep {
  private steps: Array<(cached_data: cachedData) => any>;
  private cache_id: string;
  private cache: cachedData;

  constructor(array: Array<(input: cachedData) => any>) {
	if (array instanceof Array && array.every((elem) => elem instanceof Function)) {
		this.steps = array;	
	} else {
		throw new Error("Invalid stepByStep input. stepByStep class takes an array of functions as input.");
	}
    
    // @ts-ignore
	this.cache_id = `${pm.info.requestId}-${pm.info.eventName}`;

    if (!this.get_cache().count) {
      this.cache = { count: 0, results: [] };
      this.update_cache();
    } else {
      this.cache = this.get_cache();
    }
  }

  private reset_cache() {
    // @ts-ignore
    pm.collectionVariables.unset(this.cache_id);

    // @ts-ignore
    pm.collectionVariables.set(
      this.cache_id,
      JSON.stringify({ count: 0, results: [] })
    );

    this.refresh_cache();
  }

  private refresh_cache() {
    // @ts-ignore
    this.cache = JSON.parse(pm.collectionVariables.get(this.cache_id));
  }

  private get_cache(): cachedData {
    try {
      // @ts-ignore
      this.refresh_cache();
      return this.cache;
    } catch {
      this.reset_cache();
      return this.get_cache();
    }
  }

  private update_cache() {
    // @ts-ignore
    pm.collectionVariables.set(this.cache_id, JSON.stringify(this.cache));
    this.refresh_cache();
  }

  data(): cachedData {
    return this.get_cache().results.pop();
  }

  last_data(): cachedData {
    return this.get_cache().results.filter((value: any) => (value != null)).pop();
  }

  run(): stepByStep {
    let result = null;

    try {
      if (this.steps[this.cache.count]) {
        result = this.steps[this.cache.count]({ ...this.cache }) || null;
      } else {
        this.reset_cache();
        result = this.steps[0]({ ...this.cache }) || null;
      }

      this.cache.count += +1;

      this.cache["results"]
        ? this.cache["results"].push(result)
        : (this.cache["results"] = [result]);
    } catch {
      this.reset_cache();
      throw new Error("Something went wrong, you should check your code");
    }
    this.update_cache();

    return this;
  }
}
