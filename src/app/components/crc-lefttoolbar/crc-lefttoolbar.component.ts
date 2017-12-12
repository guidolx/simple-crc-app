import { Component, HostListener, ViewChild } from '@angular/core';
import { CrcCreateModelModalComponent } from '../../components/dialogs/crc-create-model-modal/crc-create-model-modal.component';
import { CrcDeleteModelModalComponent } from '../../components/dialogs/crc-delete-model-modal/crc-delete-model-modal.component';
import { CrcOpenModelModalComponent } from '../../components/dialogs/crc-open-model-modal/crc-open-model-modal.component';
import { CardService } from '../../shared/card.service';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'crc-lefttoolbar',
  templateUrl: './crc-lefttoolbar.component.html',
  styleUrls: ['./crc-lefttoolbar.component.css']
})
export class CrcLefttoolbarComponent {



  @ViewChild(CrcCreateModelModalComponent) createModelModal: CrcCreateModelModalComponent;

  @ViewChild(CrcOpenModelModalComponent) openModelModal: CrcOpenModelModalComponent;

  @ViewChild(CrcDeleteModelModalComponent) deleteModelModal: CrcDeleteModelModalComponent;

  constructor(private cardService: CardService) { }

  ngOnInit() {

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.ctrlKey == true) {
      let k = event.key;
      if (k == null) {
        return;
      }
      switch (k.toLowerCase()) {
        case 'm':
          this.newModelClick();
          break;
        case 'd':
          this.deleteModelClick();
          break;
        case 's':
          this.saveModelClick();
          break;
        case 'o':
          this.openModelClick();
          break;
        case 'u':
          this.uploadModelClick();
          break;
        case 'j':
          this.downloadModelClick();
          break;
      }
    }
  }

  public newModelClick() {
    this.createModelModal.isModalOpen = true;
  }

  public saveModelClick() {
    this.cardService.saveCurrentModel();
  }

  public openModelClick() {
    this.openModelModal.isModalOpen = true;
  }

  public deleteModelClick() {
    this.deleteModelModal.model = this.cardService.getCurrentModel();
    this.deleteModelModal.isModalOpen = true;
  }

  public uploadModelClick() {
    document.getElementById('import-file').click();
  }

  public downloadModelClick() {
    let dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(this.cardService.getCurrentModelAsJSON());
    let name = this.cardService.getCurrentModelTitle();
    let a = document.getElementById('export-file');
    a.setAttribute("href", dataUri);
    a.setAttribute("download", `${name}.json`);
    a.click();
  }

  public uploadFile() {
    var fileElement = <HTMLInputElement>document.getElementById('import-file');
    let files = fileElement.files; // FileList object
    let f = files[0];
    let reader = new FileReader();
    let that = this;
    reader.onload = (function(theFile) {
      return function(e) {
        try {
          that.cardService.loadFromString(e.target.result);
        } catch (e) {
          alert(e);
        }
      };
    })(f);

    reader.readAsText(f);
  }

}
