import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FormUtils} from '../../../shared/utils';
import {UsersQuery} from '../../../authentication/state/users/users.query';
import {TicketsService} from '../state/tickets.service';
import {alert} from 'devextreme/ui/dialog';
import {Ticket} from '../state/ticket.model';
import {ProjectsStore} from '../../projects/state/projects.store';
import {DxTextBoxComponent} from 'devextreme-angular';
import {GeneralUtils} from '../../../shared/utils/data-utils/data-utils';

@Component({
    selector: 'dxa-ticket-add-edit-form',
    templateUrl: './add-edit-form.component.html',
    styleUrls: ['./add-edit-form.component.scss']
})
export class AddEditFormComponent implements OnChanges {

    form = this.formBuilder.group({
        title: ['', Validators.required],
        description: '',
        assigneeId: 1
    });
    validate = FormUtils.validateDxControl;
    users$ = this.usersQuery.selectAll();
    isLoading = false;

    @Input()
    ticket: Ticket;

    @Output()
    closed = new EventEmitter<void>();

    @ViewChild('titleTextBox')
    titleTextBox: DxTextBoxComponent;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly usersQuery: UsersQuery,
        private readonly service: TicketsService,
        private readonly projectsStore: ProjectsStore
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('ticket' in changes && this.ticket) {
            const {title, description, assigneeId} = this.ticket;

            this.form.setValue({
                title,
                description,
                assigneeId
            });
        } else if ('ticket' in changes) {
            this.form.reset();
        }
    }

    focusFirstInput() {
        this.titleTextBox.instance.focus();
    }

    async submitForm() {
        if (!this.form.valid) {
            alert('Please enter required data', 'Invalid Input');
            return;
        }

        if (this.ticket) {
            this.updateTicket();
        } else {
            this.createTicket();
        }
    }

    createTicket() {
        const ticket: Ticket = this.form.value;

        ticket.projectId = this.projectsStore.getValue().selectedId;

        this.isLoading = true;
        this.service.add(ticket).subscribe(
            () => {
                this.isLoading = false;
                this.cancelClick();
            }
        );
    }

    updateTicket() {
        const formValue = this.form.value,
            changes: Partial<Ticket> = GeneralUtils.diff(this.ticket, formValue);

        if (!Object.keys(changes).length) {
            this.cancelClick();
            return;
        }

        this.isLoading = true;
        this.service.update(this.ticket.id, changes).subscribe(
            () => {
                this.isLoading = false;
                this.cancelClick();
            }
        );
    }

    cancelClick() {
        this.closed.emit();
        if (!this.ticket) {
            this.form.reset({
                title: '',
                description: '',
                assigneeId: 1
            });
        }
    }

}
