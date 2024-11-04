import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Tab2Page } from './tab2.page';
import { ProductsService } from '../services/products.service';
import { PerfilService } from '../services/perfil.service';
import { CarritoService } from '../services/carrito.service';
import { AlertasService } from '../services/alertas.service';
import { IonicModule, IonModal } from '@ionic/angular';
import { of } from 'rxjs';
import { Products } from '../interface/products';
import { UserData } from '../interface/userData';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let perfilService: jasmine.SpyObj<PerfilService>;
  let carritoService: jasmine.SpyObj<CarritoService>;
  let alertaService: jasmine.SpyObj<AlertasService>;

  const mockProduct: Products = {
    idProducto: 1,
    Nombre: 'Pizza',
    Ingredientes: 'Tomato, Cheese',
    Descripcion: 'Delicious pizza with fresh ingredients',
    Precio: 12.99,
    Disponibilidad: 10,
    FechaIntroduccion: '2023-01-01',
    Categoria: 1,
    Estado: 'Available',
    Imagen: 'https://example.com/pizza.png'
  };

  const mockUserData: UserData = {
    idUsuario: 1,
    Nombre: 'Juan',
    ApellidoPaterno: 'Pérez',
    ApellidoMaterno: 'López',
    Correo: 'juan@example.com',
    Telefono: '1234567890',
    Rol: 1,
    EstadoCuenta: 'Active',
    Token: 'mock-token',
    Icono: 'https://example.com/icon.png'
  };

  beforeEach(waitForAsync(() => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getALLProducts', 'obtenerDetallesProducto']);
    const perfilServiceSpy = jasmine.createSpyObj('PerfilService', ['obtenerDatosUsuario']);
    const carritoServiceSpy = jasmine.createSpyObj('CarritoService', ['agregarAlCarrito']);
    const alertaServiceSpy = jasmine.createSpyObj('AlertasService', ['presentAlert']);

    TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: PerfilService, useValue: perfilServiceSpy },
        { provide: CarritoService, useValue: carritoServiceSpy },
        { provide: AlertasService, useValue: alertaServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    perfilService = TestBed.inject(PerfilService) as jasmine.SpyObj<PerfilService>;
    carritoService = TestBed.inject(CarritoService) as jasmine.SpyObj<CarritoService>;
    alertaService = TestBed.inject(AlertasService) as jasmine.SpyObj<AlertasService>;
    component.userData = mockUserData; // Asegura que userData esté inicializado
    component.productModal = jasmine.createSpyObj('IonModal', ['present']);

  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on initialization', async () => {
    perfilService.obtenerDatosUsuario.and.returnValue(Promise.resolve(mockUserData));
    await component.traerDatosUsuario();
    expect(component.userData).toEqual(mockUserData);
    expect(perfilService.obtenerDatosUsuario).toHaveBeenCalled();
  });

  it('should handle guest user data if no user data found', async () => {
    perfilService.obtenerDatosUsuario.and.returnValue(Promise.resolve(null));
    await component.traerDatosUsuario();
    expect(component.userData.Nombre).toBe('Invitado');
  });

  it('should load all products on initialization', () => {
    productsService.getALLProducts.and.returnValue(of([mockProduct]));
    component.getALLProducts();
    expect(component.products).toEqual([mockProduct]);
    expect(productsService.getALLProducts).toHaveBeenCalled();
  });

  it('should add product to cart and show alert on success', async () => {
    carritoService.agregarAlCarrito.and.returnValue(Promise.resolve(true));
    await component.agregarAlCarrito(mockProduct.idProducto);
    expect(carritoService.agregarAlCarrito).toHaveBeenCalledWith(component.userData.idUsuario, mockProduct.idProducto);
    expect(alertaService.presentAlert).toHaveBeenCalledWith('Producto agregado');
  });

  it('should fetch product details and open modal', () => {
    productsService.obtenerDetallesProducto.and.returnValue(of(mockProduct));
    component.obtenerDetalleProducto(mockProduct.idProducto);
    expect(productsService.obtenerDetallesProducto).toHaveBeenCalledWith(mockProduct.idProducto);
    expect(component.productoSelect).toEqual(mockProduct);
    expect(component.productModal.present).toHaveBeenCalled();
  });

  it('should dismiss the modal on canDismiss call', async () => {
    expect(await component.canDismiss()).toBeTrue();
  });
});
