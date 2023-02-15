import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BasicTestModule } from 'src/app/basic-test.module';
import { ErrorVisualDirective } from 'src/app/directives/error-visual.directive';
import { TransformationType } from 'src/app/enums/transformation-type';
import { RevisionState } from 'src/app/enums/revision-state';
import { CopyTransformationDialogComponent } from './copy-transformation-dialog.component';
import { Transformation } from '../../model/transformation';
import { selectAllTransformations } from 'src/app/store/transformation/transformation.selectors';

describe('CopyTransformationDialogComponent', () => {
  let component: CopyTransformationDialogComponent;
  let fixture: ComponentFixture<CopyTransformationDialogComponent>;

  const mockCopyTransformation: Transformation = {
    id: 'mockId0',
    revision_group_id: 'mockGroupId',
    name: 'mock0',
    description: 'mock description',
    category: 'EXAMPLES',
    version_tag: '0.0.1',
    released_timestamp: new Date().toISOString(),
    disabled_timestamp: new Date().toISOString(),
    state: RevisionState.DRAFT,
    type: TransformationType.COMPONENT,
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BasicTestModule, FormsModule, ReactiveFormsModule],
        declarations: [CopyTransformationDialogComponent, ErrorVisualDirective],
        providers: [
          provideMockStore(),
          { provide: MatDialogRef, useValue: {} },
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              transformation: {
                title: 'MOCK',
                content: 'MOCK',
                actionOk: 'MOCK',
                actionCancel: 'MOCK',
                transformation: {
                  id: 'mockId1',
                  revision_group_id: 'mockGroupId',
                  name: 'mock1',
                  description: 'mock description',
                  category: 'EXAMPLES',
                  version_tag: '0.0.1',
                  released_timestamp: new Date().toISOString(),
                  disabled_timestamp: new Date().toISOString(),
                  state: RevisionState.DRAFT,
                  type: TransformationType.COMPONENT,
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
                },
                disabledState: {
                  name: true,
                  category: true,
                  description: true,
                  tag: true
                }
              }
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    const mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectAllTransformations, [
      mockCopyTransformation
    ]);
    fixture = TestBed.createComponent(CopyTransformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
