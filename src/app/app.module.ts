import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { CrcViewContainerComponent } from './components/crc-view-container/crc-view-container.component';
import { CrcEditModalComponent } from './components/dialogs/crc-edit-modal/crc-edit-modal.component';
import { CardService } from './shared/card.service';
import { LocalStorageService } from './shared/local-storage.service';
import { ConfigService } from './shared/config.service';
import { CrcSvgComponent } from './components/crc-svg/crc-svg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrcToptoolbarComponent } from './components/crc-toptoolbar/crc-toptoolbar.component';
import { CrcLefttoolbarComponent } from './components/crc-lefttoolbar/crc-lefttoolbar.component';
import { CrcGenericDialogComponent } from './components/dialogs/crc-generic-dialog/crc-generic-dialog.component';
import { CrcCreateModelModalComponent } from './components/dialogs/crc-create-model-modal/crc-create-model-modal.component';
import { CrcOpenModelModalComponent } from './components/dialogs/crc-open-model-modal/crc-open-model-modal.component';
import { CrcDeleteModalComponent } from './components/dialogs/crc-delete-modal/crc-delete-modal.component';
import { CrcDeleteModelModalComponent } from './components/dialogs/crc-delete-model-modal/crc-delete-model-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    CrcViewContainerComponent,
    CrcEditModalComponent,
    CrcSvgComponent,
    CrcToptoolbarComponent,
    CrcLefttoolbarComponent,
    CrcGenericDialogComponent,
    CrcCreateModelModalComponent,
    CrcOpenModelModalComponent,
    CrcDeleteModalComponent,
    CrcDeleteModelModalComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [CardService, LocalStorageService, ConfigService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
