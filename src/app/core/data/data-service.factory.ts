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
import { Injectable, Injector } from '@angular/core';

import { AggregationDataService } from '@src/app/core/data/aggregation-data.service';
import { CollectionDataService } from '@src/app/core/data/collection-data.service';
import { EntityDataService } from '@src/app/core/data/entity-data.service';
import { KinveyServiceConfig } from '@src/app/core/data/kinvey-service-config';
import { AggregationState } from '@src/app/core/data/state/aggregation-state.interface';
import { CollectionState } from '@src/app/core/data/state/collection-state.interface';

@Injectable()
export class DataServiceFactory {
    constructor(protected injector: Injector) {}

    public collection<T>({ config, initialState, typeName }: { config: KinveyServiceConfig, initialState?: CollectionState, typeName?: string }): CollectionDataService<T> {
        if (initialState) {
            initialState.take = initialState.take || config.pageSize;
        }

        return new CollectionDataService<T>(this.injector, config, initialState, typeName);
    }

    public entity<T>({ config, id, typeName }: { config: KinveyServiceConfig, id?: string, typeName?: string }): EntityDataService<T> {
        return new EntityDataService(this.injector, config, id ? { id } : undefined, typeName);
    }

    public aggregation({ config, initialState, typeName }: { config: KinveyServiceConfig, initialState?: AggregationState, typeName?: string }): AggregationDataService  {
        return new AggregationDataService(this.injector, config, initialState, typeName);
    }
}
