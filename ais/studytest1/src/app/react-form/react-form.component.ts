import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { lengthValidator } from './lengthValidator.validator';


@Component({
    selector: 'app-react-form',
    templateUrl: './react-form.component.html',
    styleUrls: ['./react-form.component.scss']
})
export class ReactFormComponent {

    // profileForm = new FormGroup({
    //     userName: new FormControl('', [Validators.required, lengthValidator(3, 9)]),
    //     userAge: new FormControl('', Validators.required),
    //     userOccupation: new FormControl('', [Validators.required, lengthValidator(4, 15)]),
    // });

    profileForm = this.fb.group({
        userName: ['', [Validators.required, lengthValidator(3, 9)]],
        userAge: ['', Validators.required],
        userOccupation: ['', [Validators.required, lengthValidator(4, 15)]],
        // address: this.fb.group({
        //     street: [''],
        //     city: [''],
        //     state: [''],
        //     zip: ['']
        // }),
    });

    constructor(private fb: FormBuilder) { }

    onSubmit() {
        console.log(this.profileForm);
        this.profileForm.reset();
    }
}
