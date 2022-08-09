import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedItemPageComponent } from './listed-item-page.component';

describe('ListedItemPageComponent', () => {
  let component: ListedItemPageComponent;
  let fixture: ComponentFixture<ListedItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedItemPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
