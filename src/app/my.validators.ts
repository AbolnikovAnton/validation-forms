import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export class MyValidators {

    static restrictedEmails(control: FormControl): { [key: string]: boolean } {
        if (['b@mail.ru', 'a@gmail.com', 'ba@yahoo.com'].includes(control.value)) {
            return {restrictedEmails: true}
        }
        return null
    }

    static uniqEmail(control: FormControl): Promise<any> | Observable<any> {
        return new Promise(resolve => {
            setTimeout(() => {
                if (control.value === 'async@mail.ru') {
                    resolve({uniqEmail: true})
                } else {
                    resolve(null)
                }
            }, 1000)
        })
    }
}
