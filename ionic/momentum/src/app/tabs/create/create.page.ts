import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit() {
    // this.createPost();
    this.getPosts();
    this.getPost();
    // this.deletePost();
    // this.updatePost();
  }

  createPost() {
    const post = {
      owner: 'asdfasdfasdf',
      likes: 1200,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, hic nostrum. Impedit maiores perspiciatis consequuntur dolorum ullam, nulla saepe quidem.'
    };

    this.postService.createPost(post).then(() => {
      console.log('Post created');
    }).catch((error) => {
      console.log(error);
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe((posts) => {
      console.log(posts);
    });
  }

  getPost() {
    this.postService.getPost('9UgGvGQC6nH5PofrdeYi').subscribe((post) => {
      console.log(post);
    });
  }

  deletePost() {
    this.postService.deletePost('6wr3B4xo0CmKvBDXEjs7').then(() => {
      console.log('Post deleted');
    }).catch((error) => {
      console.log(error);
    });
  }

  updatePost() {
    const updatedPost = {
      owner: 'edited',
      likes: 1200,
      description: 'nulla saepe quidem.'
    };

    this.postService.updatePost('9UgGvGQC6nH5PofrdeYi', updatedPost).then(() => {
      console.log('Post updated');
    }).catch((error) => {
      console.log(error);
    });
  }
}
