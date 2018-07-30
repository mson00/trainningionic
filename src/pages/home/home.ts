import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Note } from 'ionic-angular';
import {NoteModel} from '../../models/note.model';
import { AngularFirestore,
  AngularFirestoreDocument,
   AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  notes: Observable<NoteModel[]>;
  private noteDoc: AngularFirestoreDocument<NoteModel>;
  private noteCollection: AngularFirestoreCollection<NoteModel>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public afs:AngularFirestore,private toastCtrl: ToastController ) {
  }

  ionViewDidLoad():void{
    this.listNotes();
//    this.navCtrl.push('NotePage');

  }

listNotes():void{
  this.noteCollection = this.afs.collection<NoteModel>('note');
  this.notes = this.noteCollection.valueChanges();
}
  irParaNovo(){
     this.navCtrl.push('TarefaPage', {data:'Vim da Home'});
    //this.navCtrl.setRoot('TarefaPage');
  }


  delete(note:NoteModel):void{
    this.messageToast("Exclusão realizada com sucesso");
   console.log('oiioii',note.id)
    this.noteDoc = this.afs.doc<NoteModel>(`note/${note.id}`);
    this.noteDoc.delete();


}
messageToast(msg:string) : void{

  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();

}


}
