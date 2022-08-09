import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProductPageComponent } from './post-product-page.component';

describe('PostProductPageComponent', () => {
  let component: PostProductPageComponent;
  let fixture: ComponentFixture<PostProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
