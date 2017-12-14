import { Component, Input, ViewChild } from '@angular/core';
import { CRCItem } from './model/crcitem';
import { CrcEditModalComponent } from './components/dialogs/crc-edit-modal/crc-edit-modal.component';

/**
The bootstraped AppComponent which defines the html structure of the application.
This component handles a createCard event raised by the button Create CRC Card
in the top toolbar.
**/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
  The dialogue component which creates new CRC Card.
  **/
  @ViewChild(CrcEditModalComponent) modal: CrcEditModalComponent;

  /**
  * This method will display a dialogue to create a CRC Card.
  **/
  onOpenModal() {
    const item: CRCItem = this.createCard();
    this.modal.item = item;
    this.modal.isModalOpen = true;
  }

  private createCard(): CRCItem {
    const card = new CRCItem();
    card.posX = 50;
    card.posY = 50;
    return card;
  }

}
