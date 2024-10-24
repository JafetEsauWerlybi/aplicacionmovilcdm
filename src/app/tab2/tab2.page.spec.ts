import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, IonModal } from '@ionic/angular';
import { Tab2Page } from './tab2.page';
import { ProductsService } from '../services/products.service';
import { PerfilService } from '../services/perfil.service';
import { CarritoService } from '../services/carrito.service';
import { of } from 'rxjs';
import { Products } from '../interface/products';
import { UserData } from '../interface/userData';

const mockProducts: Products[] = [
  {
    idProducto: 1,
    Nombre: 'Product 1',
    Ingredientes: 'Ingredient 1, Ingredient 2',
    Descripcion: 'A great product',
    Precio: 100,
    Disponibilidad: 10,
    FechaIntroduccion: '2024-10-24',
    Categoria: 1,
    Estado: 'Disponible',
    Imagen: 'https://example.com/image1.png'
  }
];

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let perfilServiceSpy: jasmine.SpyObj<PerfilService>;
  let carritoServiceSpy: jasmine.SpyObj<CarritoService>;

  beforeEach(waitForAsync(() => {
    const productsServiceMock = jasmine.createSpyObj('ProductsService', ['getALLProducts', 'obtenerDetallesProducto']);
    const perfilServiceMock = jasmine.createSpyObj('PerfilService', ['obtenerDatosUsuario']);
    const carritoServiceMock = jasmine.createSpyObj('CarritoService', ['agregarAlCarrito']);
    productsServiceMock.getALLProducts.and.returnValue(of(mockProducts));

    TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: PerfilService, useValue: perfilServiceMock },
        { provide: CarritoService, useValue: carritoServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    perfilServiceSpy = TestBed.inject(PerfilService) as jasmine.SpyObj<PerfilService>;
    carritoServiceSpy = TestBed.inject(CarritoService) as jasmine.SpyObj<CarritoService>;
  }));

  it('should fetch all products on initialization', () => {
    console.log('Testing: should fetch all products on initialization');
    const mockProducts: Products[] = [
      {
        idProducto: 1,
        Nombre: 'Product 1',
        Ingredientes: 'Ingredient 1, Ingredient 2',
        Descripcion: 'A great product',
        Precio: 100,
        Disponibilidad: 10,
        FechaIntroduccion: '2024-10-24',
        Categoria: 1,
        Estado: 'Disponible',
        Imagen: 'https://example.com/image1.png'
      }
    ];
    productsServiceSpy.getALLProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productsServiceSpy.getALLProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    console.log('Products after initialization:', component.products);
  });

  it('should fetch user data on initialization', async () => {
    console.log('Testing: should fetch user data on initialization');
    const mockUserData: UserData = {
      idUsuario: 1,
      Nombre: 'John',
      ApellidoPaterno: 'Doe',
      ApellidoMaterno: 'Smith',
      Correo: 'john.doe@example.com',
      Telefono: '1234567890',
      Rol: 1,
      EstadoCuenta: 'Activo',
      Token: 'mockToken123',
      Icono: 'https://example.com/icon.png'
    };
    perfilServiceSpy.obtenerDatosUsuario.and.returnValue(Promise.resolve(mockUserData));

    await component.traerDatosUsuario();

    expect(perfilServiceSpy.obtenerDatosUsuario).toHaveBeenCalled();
    expect(component.userData).toEqual(mockUserData);
    console.log('User data after fetch:', component.userData);
  });

  it('should add product to cart', async () => {
    console.log('Testing: should add product to cart');
    const mockUserId = 1;
    const mockProductId = 10;
    component.userData = {
      idUsuario: mockUserId,
      Nombre: 'John',
      ApellidoPaterno: 'Doe',
      ApellidoMaterno: 'Smith',
      Correo: 'john.doe@example.com',
      Telefono: '1234567890',
      Rol: 1,
      EstadoCuenta: 'Activo',
      Token: 'mockToken123',
      Icono: 'https://example.com/icon.png'
    };
    carritoServiceSpy.agregarAlCarrito.and.returnValue(Promise.resolve(true));

    await component.agregarAlCarrito(mockProductId);

    expect(carritoServiceSpy.agregarAlCarrito).toHaveBeenCalledWith(mockUserId, mockProductId);
    console.log('Cart addition result:', carritoServiceSpy.agregarAlCarrito.calls.mostRecent().args);
  });

  it('should fetch product details and present modal', () => {
    console.log('Testing: should fetch product details and present modal');
    const mockProduct: Products = {
      idProducto: 1,
      Nombre: 'Product 1',
      Ingredientes: 'Ingredient 1, Ingredient 2',
      Descripcion: 'A great product',
      Precio: 100,
      Disponibilidad: 10,
      FechaIntroduccion: '2024-10-24',
      Categoria: 1,
      Estado: 'Disponible',
      Imagen: 'https://example.com/image1.png'
    };
  
    productsServiceSpy.obtenerDetallesProducto.and.returnValue(of(mockProduct));
    
    // Asegúrate de que el `productModal` esté inicializado antes de llamar a `spyOn`
    fixture.detectChanges(); // Esto fuerza la detección de cambios y debería inicializar el ViewChild
    spyOn(component.productModal, 'present').and.returnValue(Promise.resolve());
  
    component.obtenerDetalleProducto(mockProduct.idProducto);
  
    expect(productsServiceSpy.obtenerDetallesProducto).toHaveBeenCalledWith(mockProduct.idProducto);
    expect(component.productoSelect).toEqual(mockProduct);
    expect(component.productModal.present).toHaveBeenCalled();
    console.log('Selected product details:', component.productoSelect);
  });
  
});
