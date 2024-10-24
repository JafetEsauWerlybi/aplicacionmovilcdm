import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RecuperarPage } from './recuperar.page';
import { of } from 'rxjs';
import { AlertasService } from '../services/alertas.service';
import { RecuperarpasswordService } from '../services/recuperarpassword.service';

describe('RecuperarPage', () => {
  let component: RecuperarPage;
  let fixture: ComponentFixture<RecuperarPage>;
  let recuperarServiceSpy: jasmine.SpyObj<RecuperarpasswordService>;
  let alertasServiceSpy: jasmine.SpyObj<AlertasService>;

  beforeEach(waitForAsync(() => {
    const recuperarServiceMock = jasmine.createSpyObj('RecuperarpasswordService', ['verificarCorreo', 'guardarEmail']);
    const alertasServiceMock = jasmine.createSpyObj('AlertasService', ['presentAlertFalla']);

    TestBed.configureTestingModule({
      declarations: [RecuperarPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: RecuperarpasswordService, useValue: recuperarServiceMock },
        { provide: AlertasService, useValue: alertasServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarPage);
    component = fixture.componentInstance;
    recuperarServiceSpy = TestBed.inject(RecuperarpasswordService) as jasmine.SpyObj<RecuperarpasswordService>;
    alertasServiceSpy = TestBed.inject(AlertasService) as jasmine.SpyObj<AlertasService>;
  }));

  it('should show failure alert if email is not found', async () => {
    console.log('Testing failure case: email not found');
    component.email = 'test@example.com';
    recuperarServiceSpy.verificarCorreo.and.returnValue(Promise.resolve(false));

    await component.onSubmit();

    expect(recuperarServiceSpy.verificarCorreo).toHaveBeenCalledWith('test@example.com');
    expect(alertasServiceSpy.presentAlertFalla).toHaveBeenCalledWith('No encontramos una cuenta asociada a ese correo');
    expect(recuperarServiceSpy.guardarEmail).not.toHaveBeenCalled();
    console.log('Failure test completed');
  });

  it('should save email if email is found', async () => {
    console.log('Testing success case: email found');
    component.email = 'test@example.com';
    recuperarServiceSpy.verificarCorreo.and.returnValue(Promise.resolve(true));

    await component.onSubmit();

    expect(recuperarServiceSpy.verificarCorreo).toHaveBeenCalledWith('test@example.com');
    expect(recuperarServiceSpy.guardarEmail).toHaveBeenCalledWith('test@example.com');
    expect(alertasServiceSpy.presentAlertFalla).not.toHaveBeenCalled();
    console.log('Success test completed');
  });

  it('should show failure alert if email is empty', async () => {
    console.log('Testing empty email case');
    component.email = '';

    await component.onSubmit();

    expect(alertasServiceSpy.presentAlertFalla).toHaveBeenCalledWith('Captura tus datos correctamente por favor');
    expect(recuperarServiceSpy.verificarCorreo).not.toHaveBeenCalled();
    expect(recuperarServiceSpy.guardarEmail).not.toHaveBeenCalled();
    console.log('Empty email test completed');
  });
});

