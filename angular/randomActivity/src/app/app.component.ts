import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/models/activity.model';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  activities: Activity[] = [
    {
      name: 'Play Soccer',
    },
    {
      name: 'Programming',
    },
    {
      name: 'Watch Netflix',
    },
    {
      name: 'Listen Music',
    }
  ];
  chosenActivity: Activity = null;

  ngOnInit(): void {
    $('.fixed-action-btn').floatingActionButton({
        direction: 'left',
        hoverEnabled: false
      });
    $('.modal').modal();
  }

  chooseActivity(): void {
    const length = this.activities.length;
    const random = Math.floor(Math.random() * length);
    const activity = this.activities[random];
    this.chosenActivity = activity;
  }

  addActivity(activityInput: HTMLInputElement): void {
    const activity = activityInput.value;

    if(activity.length > 0) {
      this.activities.push({ name: activity});
      activityInput.value = null;
      $('#addActivityModal').modal('close');
    } else {
      alert("The activity name can't be empty");
    }
  }

  closeModal(activityInput: HTMLInputElement): void {
    activityInput.value = null;
    $('#addActivityModal').modal('close');
  }
}
