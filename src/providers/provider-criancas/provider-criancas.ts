import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class ProviderCriancasProvider {

  constructor(private storage: Storage, private datePipe: DatePipe) {
    
  }

  public insert(child: Child) {
    let key = this.datePipe.transform(new Date(), 'ddMMyyyyhhss');
    return this.save(key, child);
  }

  public update(key: string, child: Child) {
    return this.save(key, child);
  }

  private save(key: string, child: Child) {
    return this.storage.set(key, child);
  }

  public remove(key: string) {
    return this.storage.remove(key);

  }

  public getAll() {
    let childs: ChildList[] = [];
    return this.storage.forEach((value: Child, key: string, iterationNumber: Number) => {
      let child = new ChildList();
      child.key = key;
      child.child = value;
      childs.push(child);
    })
      .then(() => {
        return Promise.resolve(childs);
      })
      .catch((error) => {
        return Promise.reject(error);
      }); 
  }
}

export class Child {
  name: string;
  phone: number;  
  birth: Date;
}

export class ChildList {
  key: string;
  child: Child;
}