import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SellersService } from './sellers.service';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';

@NgModule({
  declarations: [
    AppComponent,
    SellerDlgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [SellersService],
  bootstrap: [AppComponent],
  entryComponents: [SellerDlgComponent]
})
export class AppModule { }
