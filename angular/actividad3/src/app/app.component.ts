import { Component, OnInit } from '@angular/core';
import { Note } from 'src/models/note.model';

declare let $: any;
declare let M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{

  notes: Note[] = [];

  ngOnInit(): void {
    $('.collapsible').collapsible();
  }

  createNote(titleInput: HTMLInputElement, contentInput: HTMLTextAreaElement): void {
    const noteTitle = titleInput.value;
    const noteContent = contentInput.value;

    if (noteTitle.length > 0 && noteContent.length > 0) {
      const newNote: Note = {
        title: noteTitle,
        content: noteContent
      };

      this.notes.unshift(newNote);
      titleInput.value = '';
      contentInput.value = '';
      M.textareaAutoResize(contentInput);
    } else {
      alert('Please add a title and a content for your new note.');
    }
  }
}
