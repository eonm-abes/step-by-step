//#! dev
import { pm } from './mocking'

interface cachedData {
	count: number,
	results?: Array<any>,
	[key: string]: any;
}

export class stepByStep {
    steps: Array<(cached_data: cachedData) => any>;
    cache_id: string;
    cache: cachedData;

    constructor(array: Array<(input: cachedData) => any>) {
        this.steps = array || [];
        // @ts-ignore
        this.cache_id = pm.info.requestId;
        // @ts-ignore

        if (!this.get_cache().count) {
            this.cache = {count: 0, results: []};
        } else {
            this.cache = this.get_cache();
        }
    }

    reset_cache() {
        // @ts-ignore
		pm.collectionVariables.unset(this.cache_id);
        // @ts-ignore
        pm.collectionVariables.set(this.cache_id, JSON.stringify({count: 0, results: []}));
        this.refresh_cache();
    }

    refresh_cache() {
        // @ts-ignore
        this.cache = JSON.parse(pm.collectionVariables.get(this.cache_id));
    }

    get_cache(): cachedData {
        try {
            // @ts-ignore
            this.refresh_cache();
            return this.cache;
        } catch {
            this.reset_cache();
            return this.get_cache()
        }
    }

    update_cache(data: object) {
        // @ts-ignore
        pm.collectionVariables.set(this.cache_id, JSON.stringify(data));
        this.refresh_cache();
    }

    run() {
        if (!this.cache.count) {
            this.reset_cache();
        }

        let result = null;

        try {
            if (this.steps[this.cache.count]) {
                result = this.steps[this.cache.count]({... this.cache}) || null;
            } else {
                this.reset_cache();
                result = this.steps[0]({... this.cache}) || null;               
            };

            this.cache.count = this.cache.count+1;
            this.cache["results"] ? this.cache["results"].push(result) : this.cache["results"] = [result];
            this.update_cache(this.cache);
        } catch {
            
        }
    }
}

//#!if dev

//#!if pm
// @ts-ignore
eval(pm.globals.get("stepByStep"));
//#!endif

let x = new stepByStep([
    (data) => {
        console.log(`current iteration = ${data.count}`);
        console.log(data);
        // "a" sera automatiquement stocké dans un array pour pouvoir être réutilisé au cour des itérations suivantes
        return "a"
    },    
    (data) => {
        console.log(`current iteration = ${data.count}`);
        console.log(data);
       // On accède aux résultats de la fonction précédente
        // console.log(`previous function result = ${data.results?.pop()()}`);
        // return {"b": 0}
    },
    (data) => {
        console.log(`current iteration = ${data.count}`);
       // On accède aux résultats de la fonction précédente
        // console.log(`previous function result = ${data.results?.pop()}`);
        console.log(data);
        return {"b": 0}
    },
])

x.run();
x.run();
x.run();
x.run();
x.run();
x.run();
//#! endif
