import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewsCardComponent } from './dialog-news-card.component';

describe('DialogNewsCardComponent', () => {
  let component: DialogNewsCardComponent;
  let fixture: ComponentFixture<DialogNewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogNewsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
