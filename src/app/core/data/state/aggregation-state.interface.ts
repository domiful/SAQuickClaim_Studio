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
import { CompositeFilterDescriptor } from '@src/app/core/data/state/filter-descriptor.interface';
import { GroupDescriptor } from '@src/app/core/data/grouping/group-descriptor.interface';

export interface AggregationState {
    filter?: CompositeFilterDescriptor;
    group?: Array<GroupDescriptor>;
}
