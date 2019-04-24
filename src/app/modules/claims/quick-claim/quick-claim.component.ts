/////////////////////////////////////////////////////
// Add your custom code here.
// This file and any changes you make to it are preserved every time the app is generated.
/////////////////////////////////////////////////////
import { Inject, Injector } from '@angular/core';
import {MdDialogModule} from '@angular/material';
import { QuickClaimViewBaseComponent } from '@src/app/modules/claims/quick-claim/quick-claim.base.component';
import { Kinvey } from 'kinvey-angular2-sdk';

const config: Kinvey.ClientConfig = {
  appKey: 'kid_ByeZ6xduE',
  appSecret: 'c27847587528433da6b71da7af49dc6a'
};

Kinvey.initialize(config)
  .then(() => {
    const activeUser = Kinvey.User.getActiveUser();

    if (!activeUser) {
      Kinvey.User.signup()
        .then((user) => {
          console.log('implicit user created');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
export class QuickClaimViewComponent extends QuickClaimViewBaseComponent {
    item: any;
    
    constructor(@Inject(Injector) injector: Injector) {
        super(injector);
    }

    // Fired when component is initialized and input properties are set
    public onInit(): void {
       this.item = this.createClaimObject();
    }
    // Fired when component's views and child views are initialized
    public onShow(): void {}
    // Fired just before Angular destroys the component. Unsubscribe Observables and detach event handlers to avoid memory leaks
    public onHide(): void {}
    public showInjuredAlert(event){
        console.log(`Dialog result: ${event}`);
        
    }
    public showVehiclesAlert(event){
        
        if(event){
            let vW = document.querySelector( '#vWarning' );
            //console.log(iW);
            vW.hidden = false;
        }else{
            let vW = document.querySelector( '#vWarning' );
            //console.log(iW);
            vW.hidden = true;
        }
    }
    public createClaimObject() {
        const obj = {
            manyInjuries: false,
            manyVehicles: false,
            lossCause: 'accident',
            statement: 'hit something',
            lossLocation: {
                address1: '',
                address2: '',
                city: 'Austin',
                state: 'TX',
                zip: '',
                description: '',
            },
            insured: {
                driver: {
                firstName: 'D',
                lastName: 'Raymond',
                middleInitial: '',
                address1: '',
                city: '',
                state: '',
                zip: '',
                primaryPhone: '',
                mobile: '',
                email: '',
                main: '',
                driverIsOwner: true,
                },
                vehicle: {
                firstName: '',
                lastName: 'Raymond',
                middleInitial: '',
                year: '',
                make: '',
                model: '',
                damaged: true,
                }
            },
            claimant: {
                driver: {
                firstName: '',
                lastName: 'Jackson',
                middleInitial: '',
                address1: '',
                city: 'Austin',
                state: 'TX',
                zip: '',
                primaryPhone: '',
                mobile: '',
                email: '',
                main: '',
                driverIsOwner: true,
                },
                vehicle: {
                firstName: '',
                lastName: '',
                middleInitial: '',
                year: '',
                make: '',
                model: '',
                damaged: false,
                }
            },
        };

        return obj;
    }


  public saveClaim() {
    const dataStore = Kinvey.DataStore.collection('claims');

    const promise = dataStore.save(this.item)
    .then(function (entity: {}) {
      //this.stepper.next();
      //this.cd.detectChanges();
    }).catch(function (error: Kinvey.BaseError) {
      console.log(error);
    });
  }

  public checkPolicy(){
        const dataStore = Kinvey.DataStore.collection('policies');
        var query = new Kinvey.Query();
        console.log(document.querySelector( '#policy' ).value);
        query.equalTo('policyNum', document.querySelector( '#policy' ).value);
      var stream = dataStore.find(query).subscribe(function (data) {
            console.log(data);
        }, function onError(error) {
            console.log('no policy found');
        }, function onComplete() {
        // ...
        });
  }

  public updateItem(event){
        console.log(event);
  }

  reset() {
    this.onInit();
    //this.stepper.reset();
  }
}
