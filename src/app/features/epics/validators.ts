import { AbstractControl } from "@angular/forms";

export const isAssignedIdValid = (control: AbstractControl) => {
    if (control.value === 'null' || control.value === null) return { required: true }
    return null;
}

export const isDeadlineValid = (control: AbstractControl) => {
    if (control.value === null) return { required: true }

    const deadline = new Date(control.value);

    deadline.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadline < today) {
        return { pastDate: true };
    }

    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);

    if (deadline > maxDate) {
        return { maxDate: true }
    };

    return null;
}
