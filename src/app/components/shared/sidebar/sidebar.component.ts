import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../services/traslation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.translate
      .use(this.translationService.getSelectedLanguage())
      .subscribe();
  }
}
