/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nga-layout-header-test',
  template: `
    <nga-layout>
      <nga-layout-header fixed>
        <a class="navbar-brand" href="#">ngx-admin</a>
      </nga-layout-header>
    </nga-layout>
`,
})
export class NgaLayoutHeaderTestComponent {
}
