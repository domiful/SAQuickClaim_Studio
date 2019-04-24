//-------------------------------------------------------------------------
// <Auto-generated file - do not modify!>
//
// This code was generated automatically by Kinvey Studio.
//
// Changes to this file may cause undesired behavior and will be lost
// the next time the code regenerates.
//
// Find more information on https://devcenter.kinvey.com/guides/studio-extension-points.
//-------------------------------------------------------------------------
import { Injector } from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';
import { flatMap, last, map, shareReplay, withLatestFrom } from 'rxjs/operators';

import { BaseDataService } from '@src/app/core/data/base-data.service';
import { KinveyServiceConfig } from '@src/app/core/data/kinvey-service-config';
import { KinveyService } from '@src/app/core/data/kinvey.service';
import { GroupResult } from '@src/app/core/data/grouping/group-descriptor.interface';
import { AggregationState } from '@src/app/core/data/state/aggregation-state.interface';

export class AggregationDataService extends BaseDataService<GroupResult, KinveyServiceConfig, AggregationState> {
    private coreService: KinveyService;

    constructor(protected injector: Injector, config: KinveyServiceConfig, initialState?: AggregationState, typeName?: string) {
        super(config, initialState, typeName);

        this.coreService = this.injector.get(KinveyService);
    }

    public refresh(): Promise<any> {
        return this.toPromise(() => this.getDataReload().next());
    }

    protected getDataChanges(): Observable<GroupResult> {
        const groupObservable = state => this.coreService.group(this.config, state).pipe(
            this.handleObservableError(),
            last(value => !!value)
        );

        return merge(
            this.getDataReload().pipe(
                withLatestFrom(this.dataState.changes),
                map(([_, state]) => state)
            ),
            this.dataState.changes
        ).pipe(
            flatMap(state => groupObservable(state)),
            shareReplay(1)
        );
    }
    
    protected getDataReload(): Subject<any> {
        return this.coreService.getDataReload(this.config.collection);
    }
}