import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/module/itask';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];
  updateId!: any;
  isEditEnable: boolean = false;
  time = new Date();
  hours: any;
  msg: any;
  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false,
    });
    this.todoForm.reset();
  }

  updateTask() {
    this.tasks[this.updateId].description = this.todoForm.value.item;
    this.tasks[this.updateId].done = false;
    this.todoForm.reset();
    this.updateId = undefined;
    this.isEditEnable = false;
  }

  onEdit(item: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateId = i;
    this.isEditEnable = true;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInProgress(i: number) {
    this.inProgress.splice(i, 1);
  }
  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  decide() {
    this.hours = new Date().getHours();
    console.log('this.hours', this.hours);
    if (this.hours < 10) {
      this.msg = 'Good Morning';
    } else if (this.hours < 16) {
      this.msg = 'Good Afternoon';
    } else if (this.hours < 19) {
      this.msg = 'Good Evening';
    } else if (this.hours < 24) {
      this.msg = 'Good Night';
    } else if (this.hours < 6) {
      this.msg = 'Good Night';
    }
  }

  constructor(private fb: FormBuilder) {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.decide();
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }
}
