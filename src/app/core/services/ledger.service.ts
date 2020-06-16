import { Injectable } from '@angular/core';
import { runTransaction } from '@numbersprotocol/niota';
import { from, Observable, of } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';

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
