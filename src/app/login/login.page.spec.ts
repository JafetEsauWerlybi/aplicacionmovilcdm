import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { LoginPage } from './login.page';
import { of } from 'rxjs';
import { UserStorageService } from '../services/user-storage.service';
import { LoginService } from '../services/login.service';
import { AlertasService } from '../services/alertas.service';
import { Storage } from '@ionic/storage-angular';

// Definir storageMock antes de usarlo
const storageMock = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
    get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
    set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
    remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()),
    clear: jasmine.createSpy('clear').and.returnValue(Promise.resolve())
  })),
  get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
  set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
  remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()),
  clear: jasmine.createSpy('clear').and.returnValue(Promise.resolve())
};

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let alertasServiceSpy: jasmine.SpyObj<AlertasService>;

  beforeEach(waitForAsync(() => {
    const loginServiceMock = jasmine.createSpyObj('LoginService', ['verificarCorreo', 'login', 'obtenerDatos']);
    const alertasServiceMock = jasmine.createSpyObj('AlertasService', ['presentAlert', 'presentAlertFalla']);
    
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: AlertasService, useValue: alertasServiceMock },
        { provide: Storage, useValue: storageMock },
        UserStorageService,
        AlertController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    alertasServiceSpy = TestBed.inject(AlertasService) as jasmine.SpyObj<AlertasService>;
  }));

  it('should show success alert if email is found', async () => {
    console.log('Testing success case: email found');
    component.email = 'test@example.com';
    loginServiceSpy.verificarCorreo.and.returnValue(Promise.resolve(true));

    await component.long();
  
    expect(loginServiceSpy.verificarCorreo).toHaveBeenCalledWith('test@example.com');
    expect(alertasServiceSpy.presentAlert).toHaveBeenCalledWith('Exito se guardaron correctamente los datos');
    expect(loginServiceSpy.obtenerDatos).toHaveBeenCalledWith('test@example.com');
    console.log('Success test completed');
  });

  it('should show failure alert if email is not found', async () => {
    console.log('Testing failure case: email not found');
    component.email = 'test@example.com';
    loginServiceSpy.verificarCorreo.and.returnValue(Promise.resolve(false));

    await component.long();

    expect(loginServiceSpy.verificarCorreo).toHaveBeenCalledWith('test@example.com');
    expect(alertasServiceSpy.presentAlertFalla).toHaveBeenCalledWith('No encontramos una cuenta asociada a ese correo');
    expect(loginServiceSpy.obtenerDatos).not.toHaveBeenCalled();
    console.log('Failure test completed');
  });

  it('should show failure alert if email or password is empty', () => {
    console.log('Testing case: empty email or password');
    component.email = '';
    component.password = '';

    component.onSubmit();

    expect(alertasServiceSpy.presentAlertFalla).toHaveBeenCalledWith('Captura tus datos correctamente por favor');
    console.log('Empty email or password test completed');
  });
});
