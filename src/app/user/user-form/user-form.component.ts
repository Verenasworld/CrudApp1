import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { UserService } from '../user.service';

@Component ( {
  selector   : 'in-user-form',
  templateUrl: './user-form.component.html',
  styleUrls  : [ './user-form.component.scss' ]
} )
export class UserFormComponent implements OnInit, OnDestroy {

  myForm: FormGroup;
  firstname: AbstractControl;
  lastname: AbstractControl;
  age: AbstractControl;
  id: AbstractControl;
  email: AbstractControl;

  private user: User;
  private sub: Subscription;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private fb: FormBuilder,
               private $user: UserService,
               private app: AppComponent ) {
  }

  ngOnInit() {
    this.sub = this.route.data
                   .pipe ( first () )
                   .subscribe ( data => {
                     if ( data.hasOwnProperty ( 'user' ) ) {
                       this.user = data.user as User;
                     } else {
                       this.user = { firstname: '', lastname: '', age: null , email: ''};
                     }
                     this.prepairForm ();
                   } );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe ();
  }

  private prepairForm() {
    this.myForm    = this.fb.group ( {
      firstname: [ this.user.firstname,
                   [ Validators.required,
                     Validators.minLength ( 2 )
                   ]
      ],
      lastname : [ this.user.lastname,
                   [ Validators.required,
                     Validators.minLength ( 2 )
                   ]
      ],
      age      : [ this.user.age,
                   [ Validators.required,
                     Validators.min ( 5 ),
                     Validators.max ( 100 )
                   ]
      ],
      email       : [ this.user.email,
            [ Validators.required ]
      ]
    } );
    this.firstname = this.myForm.get ( [ 'firstname' ] );
    this.lastname  = this.myForm.get ( [ 'lastname' ] );
    this.age       = this.myForm.get ( [ 'age' ] );
    this.email       = this.myForm.get ( [ 'email' ] );

  }

  sendForm() {
    if ( !this.user.id ) {
      this.$user.create ( this.myForm.value )
          .subscribe ( succ => this.app.closeModal () );
      this.router.navigate(['/user']);
    } else {
      this.$user.update( this.myForm.value )
          .subscribe ( succ => this.app.closeModal () );
    }
  }

  resetForm( $event: Event ) {
    $event.stopImmediatePropagation ();
    $event.preventDefault ();
    this.myForm.reset ( this.user );
  }
}
