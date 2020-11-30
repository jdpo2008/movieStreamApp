import { TranslateLoader } from '@ngx-translate/core';
import { from as fromPromise, Observable } from 'rxjs';

declare var System: System;

interface System {
  import(request: string): Promise<any>;
}

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return fromPromise(System.import(`../assets/i18n/${lang}.json`));
  }
}
