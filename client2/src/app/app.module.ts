import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SellersService } from './sellers.service';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { Ng2ImgFallbackModule } from 'ng2-img-fallback';

@NgModule({
  declarations: [
    AppComponent,
    SellerDlgComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2ImgFallbackModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [SellersService],
  bootstrap: [AppComponent],
  entryComponents: [SellerDlgComponent,ProductCardComponent]
})
export class AppModule { }
