import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { forkJoin, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { DataTemplate } from '@core/interfaces/data-template';

import { Record } from '../classes/record';

@Injectable({
  providedIn: 'root'
})
export class DataTemplateService {

  readonly dataTemplateNames: string[] = [
    'heartFailure', 'commonCold','healthDeclaration', 'npc',
  ];
  dataTemplates: DataTemplate[];

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  /** Initialize data templates
   *  The observable must be subscribed and only subscribed once when the App initialization.
   *  Since loading static data templates are required for most core functionality of the App,
   *  failing to load the JSON files should stop the user from entering the main page.
   * @returns Observable
   */
  initialize(): Observable<DataTemplate[]> {
    return forkJoin(this.dataTemplateNames.map(name => this.loadDataTemplatesFromFile(name)))
      .pipe(
        tap(dataTemplates => this.dataTemplates = dataTemplates),
        tap(data => data.forEach(d => console.log(d))),
      );
  }

  setRecordWithDataTemplate(record: Record, dataTemplateName: string): Record {
    const dataTemplate = this.getDataTemplate(dataTemplateName);
    record.setTemplateName(dataTemplate.templateName);
    record.setKeyFieldName(dataTemplate.keyFieldName);
    record.setDataGroups(dataTemplate.dataGroups);
    record.setFields(dataTemplate.fields);
    return record;
  }

  getDataTemplate(dataTemplateName: string): DataTemplate {
    const dataTemplate = this.dataTemplates.find(template => template.templateName === dataTemplateName);
    if (!dataTemplate) {
      throw new Error(`Critical: Data template ${dataTemplateName} does not exist or does not initialized properly`);
    }
    return dataTemplate;
  }

  private loadDataTemplatesFromFile(dataTemplateName: string): Observable<DataTemplate> {
    const filename = this.getDataTemplateFileName(dataTemplateName);
    const dataTemplateUrl = `assets/data-templates/${filename}`;
    return this.httpClient.get<DataTemplate>(dataTemplateUrl)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error(`Critical: Failed to read data template ${dataTemplateName}. Reason: ${err.message}`);
        }),
        map(dataTemplate => {
          dataTemplate.fields.forEach(field => field.value = null);
          return dataTemplate;
        }),
      );
  }

  private getDataTemplateFileName(dataTemplateName: string): string {
    return dataTemplateName.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) + '.json';
  }

}


