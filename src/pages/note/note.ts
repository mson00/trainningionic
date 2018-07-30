import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoteModel } from '../../models/note.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {

  note: NoteModel = new NoteModel();
  private noteDoc: AngularFirestoreDocument<NoteModel>;
  private noteCollection: AngularFirestoreCollection<NoteModel>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore, private toastCtrl: ToastController) {
  }

  ionViewDidLoad(): void {
    let param: NoteModel = this.navParams.get('item');
    if (param) {
      this.note = param;
    }

  }

  save(): void {
    let msg = "";
    if (!this.note.id) {
      this.note.id = this.afs.createId();
      msg = 'Cadastro realizado com sucesso';
  //    this.update();
//      return;
    }else{
      msg = 'Atualização realizada com sucesso';

    }

      this.noteCollection = this.afs.collection<NoteModel>('note');
      this.noteCollection
        .doc(this.note.id)
        .set(Object.assign({}, this.note))
        .then(() => {
          console.log('saved');
          this.messageToast(msg);
          this.navCtrl.pop();
        }).catch((error) => {

        })

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



 async update()  : Promise<void> {

    this.noteDoc = this.afs.doc<NoteModel>('note/${this.note.id}');
    this.noteDoc.update(Object.assign({}, this.note));

  }



}


