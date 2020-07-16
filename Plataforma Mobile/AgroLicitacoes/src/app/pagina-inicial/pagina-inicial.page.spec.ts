import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaInicialPage } from './pagina-inicial.page';

describe('PaginaInicialPage', () => {
  let component: PaginaInicialPage;
  let fixture: ComponentFixture<PaginaInicialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaInicialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
