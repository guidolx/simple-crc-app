import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {CRCItem} from './model/crcitem';
import {CrcEditModalComponent} from "./components/dialogs/crc-edit-modal/crc-edit-modal.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(CrcEditModalComponent) modal: CrcEditModalComponent;

  title = 'app';

  ngAfterViewInit(): void {
  }

  onOpenModal(item: CRCItem) {
    if(item === undefined){
      item = this.createCard();
    }

    this.modal.item = item;
    this.modal.isModalOpen = true;
  }

  private createCard():CRCItem{
    const card = new CRCItem();
    card.posX = 50;
    card.posY = 50;
    return card;
  }

}
