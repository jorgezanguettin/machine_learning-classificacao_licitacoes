import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContatoPage } from './contato.page';

describe('ContatoPage', () => {
  let component: ContatoPage;
  let fixture: ComponentFixture<ContatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
