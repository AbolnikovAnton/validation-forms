import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from "./my.validators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    form: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('',
                [
                    Validators.email,
                    Validators.required,
                    MyValidators.restrictedEmails
                ], [MyValidators.uniqEmail]),
            password: new FormControl(null,
                [
                    Validators.required,
                    Validators.minLength(8)
                ]),
            address: new FormGroup({
                country: new FormControl('il'),
                city: new FormControl('Tel-Aviv', Validators.required)
            }),
            skills: new FormArray([])
        })
    }

    submit() {
        if (this.form.valid) {
            const formData = {...this.form.value};
            console.log('Form Data:', formData);

            this.form.reset()
        }
    }

    setCapital() {
        const cityMap = {
            ru: 'Moscow',
            ua: 'Kyiv',
            by: 'Minsk',
            il: 'Tel-Aviv'
        }

        const cityKey = this.form.get('address').get('country').value
        const city = cityMap[cityKey]

        this.form.patchValue({address: {city: city}})
    }

    addSkill() {
        const control = new FormControl('', Validators.required);
        (<FormArray>this.form.get('skills')).push(control)
    }
}

