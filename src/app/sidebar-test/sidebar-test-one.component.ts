/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ViewChild } from '@angular/core';
import { NgaSidebarComponent } from '../../framework/theme/components/sidebar/sidebar.component';

@Component({
  selector: 'nga-sidebar-test-one',
  styles: [
    `
    :host /deep/ nga-layout-column {
      background-color: #76ecff;
    }
    `,
  ],
  template: `
    <nga-layout>
      <nga-sidebar>
        Left
      </nga-sidebar>

      <nga-sidebar right>
        Right
      </nga-sidebar>
    </nga-layout>
`,
})
export class NgaSidebarTestOneComponent {
}
