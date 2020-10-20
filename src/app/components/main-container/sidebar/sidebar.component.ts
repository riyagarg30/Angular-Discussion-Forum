import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { CommonService, RoomData } from 'src/app/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  randomSeed: any[] = [];
  roomData: RoomData[] = [];
  lastMessage: string;
  subs: Subscription[]=[];

  @Output() seedValue: EventEmitter<string>=new EventEmitter<string>();

  constructor(private afs: AngularFirestore,
              private commonService: CommonService) { }

  ngOnInit(): void {

    this.randomSeed= Array.from({length: 20}, ()=> Math.floor(Math.random()*379127));

    this.subs.push(this.afs.collection('rooms').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          return{
            id: a.payload.doc.id,
            //@ts-ignore
            ...a.payload.doc.data()
          };
        }
        );
      })
    ).subscribe((rooms:RoomData[])=>{
      this.roomData=rooms;
    }));
  }

  onFormSubmit(form: NgForm):void{
    const {search} = form.value;
    console.log((search.toUpperCase()+ "    ").length);
    console.log((search.toUpperCase()+ "    ").trim().length);

    if (form.invalid) {
      return;
    }

    if(form.value.search.length<=0 || form.value.search.trim().length==0){
      alert('Enter room name');
      return;
    }

    this.afs.collection<RoomData>('rooms')
      .valueChanges()
      .pipe(
        map((data: RoomData[]) => data.map(s => s.name?.toLowerCase() === form.value.search?.trim().toLowerCase()))
      )
      .subscribe(dataValue => {
        dataValue = dataValue.filter(s => s === true);

        if (dataValue.length > 0) {
          alert('Sorry, room already present');
          return;
        } else {
          if (form.value.search !== null) {
            this.afs.collection('rooms').add({
              name: form.value.search.trim()
            });
          } else {
            return;
          }
          form.resetForm();
        }
      });
  }

  ngOnDestroy():void{
    this.subs.map(s=>s.unsubscribe());
  }

  seedData(ev: string): void{
    this.seedValue.emit(ev);
  }

  logout(): void{
    this.commonService.logout();
  }

}

