import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeEditModalComponent } from './anime-edit-modal.component';

describe('ModalComponent', () => {
  let component: AnimeEditModalComponent;
  let fixture: ComponentFixture<AnimeEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
