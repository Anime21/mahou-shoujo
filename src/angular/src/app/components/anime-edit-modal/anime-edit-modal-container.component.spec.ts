import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeEditModalContainerComponent } from './anime-edit-modal-container.component';

describe('AnimeEditModalContainerComponent', () => {
  let component: AnimeEditModalContainerComponent;
  let fixture: ComponentFixture<AnimeEditModalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeEditModalContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeEditModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
