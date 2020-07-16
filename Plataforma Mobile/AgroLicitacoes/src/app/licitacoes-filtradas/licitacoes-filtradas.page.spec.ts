import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LicitacoesFiltradasPage } from './licitacoes-filtradas.page';

describe('LicitacoesFiltradasPage', () => {
  let component: LicitacoesFiltradasPage;
  let fixture: ComponentFixture<LicitacoesFiltradasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitacoesFiltradasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LicitacoesFiltradasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
