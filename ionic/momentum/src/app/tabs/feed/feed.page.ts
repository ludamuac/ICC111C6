import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  posts = [
    {
      imageUrl: 'https://live.staticflickr.com/7380/10865554463_967e33332c_b.jpg',
      username: 'antoniog',
      likes: 1200,
      description: "Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
    {
      imageUrl: 'https://live.staticflickr.com/7380/10865554463_967e33332c_b.jpg',
      username: 'antoniog',
      likes: 1200,
      description: "Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
    {
      imageUrl: 'https://live.staticflickr.com/7380/10865554463_967e33332c_b.jpg',
      username: 'antoniog',
      likes: 1200,
      description: "Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
    {
      imageUrl: 'https://live.staticflickr.com/7380/10865554463_967e33332c_b.jpg',
      username: 'antoniog',
      likes: 1200,
      description: "Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
    {
      imageUrl: 'https://live.staticflickr.com/7380/10865554463_967e33332c_b.jpg',
      username: 'antoniog',
      likes: 1200,
      description: "Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
