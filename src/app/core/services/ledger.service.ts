import { Injectable } from '@angular/core';
import { RecordMeta } from '../classes/record-meta';
import { Observable, from, of } from 'rxjs';
import { map, catchError, timeout, tap } from 'rxjs/operators';
import { runTransaction } from '@numbersprotocol/niota';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  constructor() { }

  private registerOnLedger(hash: string): Observable<any> {
    const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
    const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    const rawMsg = { hash };
    return from(runTransaction(address, seed, rawMsg))
      .pipe(
        timeout(10000),
        tap(resultHash => console.log(`Hash ${resultHash} registered on ledger`, resultHash)),
        catchError(err => {
          console.log(err);
          return of('');
        })
      );
  }

  createTransactionHash(hash): Observable<string> {
    return this.registerOnLedger(hash);
  }
}
