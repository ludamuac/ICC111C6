import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs: AngularFirestore) { }

  createPost(post: any) {
    return this.afs.collection('post').add(post);
  }

  getPosts() {
    return this.afs.collection('post').snapshotChanges().pipe(
      map(docs => docs.map(doc => {
        const post = doc.payload.doc.data() as any;
        const id = doc.payload.doc.id;

        return { id, ...post };
      }))
    );
  }

  getPost(postId: string) {
    return this.afs.doc(`post/${postId}`).snapshotChanges().pipe(
      map(doc => {
        const post = doc.payload.data() as any;
        const id = doc.payload.id;

        return { id, ...post };
      })
    );

    // return this.afs.collection('post', ref => ref.where('likes', '>=', 1200).orderBy('likes', 'desc'))
    // .snapshotChanges().pipe(
    //   map(docs => docs.map(doc => {
    //     const post = doc.payload.doc.data() as any;
    //     const id = doc.payload.doc.id;

    //     return { id, ...post };
    //   }))
    // );
  }

  deletePost(postId: string) {
    return this.afs.doc(`post/${postId}`).delete();
  }

  updatePost(postId: string, updatedPost: any) {
    return this.afs.doc(`post/${postId}`).update(updatedPost);
  }
}
