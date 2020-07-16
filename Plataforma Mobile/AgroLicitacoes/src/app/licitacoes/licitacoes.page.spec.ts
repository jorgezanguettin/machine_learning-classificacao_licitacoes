import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LicitacoesPage } from './licitacoes.page';

describe('LicitacoesPage', () => {
  let component: LicitacoesPage;
  let fixture: ComponentFixture<LicitacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitacoesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LicitacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
