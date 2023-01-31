import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BaseItemType } from 'src/app/enums/base-item-type';
import { RevisionState } from 'src/app/enums/revision-state';
import { MaterialModule } from 'src/app/material.module';
import { BaseItemActionService } from 'src/app/service/base-item/base-item-action.service';
import { TabItemService } from 'src/app/service/tab-item/tab-item.service';
import { BaseItemContextMenuComponent } from './base-item-context-menu.component';

describe('BaseItemContextMenuComponent', () => {
  let component: BaseItemContextMenuComponent;
  let fixture: ComponentFixture<BaseItemContextMenuComponent>;

  beforeEach(
    waitForAsync(() => {
      const baseItemActionService = jasmine.createSpyObj<BaseItemActionService>(
        'BaseItemActionService',
        ['isIncomplete']
      );

      const tabItemService = jasmine.createSpyObj<TabItemService>(
        'TabItemService',
        ['addTransformationTab']
      );

      TestBed.configureTestingModule({
        imports: [MaterialModule, NoopAnimationsModule],
        declarations: [BaseItemContextMenuComponent],
        providers: [
          {
            provide: BaseItemActionService,
            useValue: baseItemActionService
          },
          {
            provide: TabItemService,
            useValue: tabItemService
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseItemContextMenuComponent);
    component = fixture.componentInstance;
    component.transformation = {
      id: 'mockId0',
      revision_group_id: 'mockGroupId',
      name: 'Mock',
      description: 'mock description',
      category: 'EXAMPLES',
      version_tag: '0.0.1',
      released_timestamp: new Date().toISOString(),
      disabled_timestamp: new Date().toISOString(),
      state: RevisionState.DRAFT,
      type: BaseItemType.COMPONENT,
      documentation: null,
      content: 'python code',
      io_interface: {
        inputs: [],
        outputs: []
      },
      test_wiring: {
        input_wirings: [],
        output_wirings: []
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be not published', () => {
    expect(component.isNotPublished).toBe(true);
  });
});
