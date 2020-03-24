import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToPost(postId: string) {
    this.navCtrl.navigateForward(['tabs', 'profile', 'post', postId]);
  }
}
