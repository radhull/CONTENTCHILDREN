import { Component, Input, ViewChildren, AfterViewInit, ContentChildren, AfterContentInit, QueryList } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
            <h3>Content projection vs. View children </h3>
            <div style="margin-left: 20px">
              <tab [show]="show">
                <panel id="Content 1"></panel>
                <panel id="Content 2"></panel>
                <panel *ngIf="show" id="Content 3"></panel>
              </tab>
              <button (click)="show=!show">show</button>
            </div>
            `,
})

export class AppComponent { name = 'Angular'; }


@Component({
  selector: 'panel',
  template: `
            <div>{{id}}</div>
            `,
})
export class AppPanel {
  @Input()
  id: string;
}


@Component({
  selector: 'tab',
  template: `
            <panel id="view 1"></panel>
            <panel id="view 2" *ngIf="show"></panel>

            <ng-content></ng-content>
            <ul>
              <li *ngFor="let panel1 of listContent">
                <span>{{panel1.id}}</span>
              </li>
            </ul>

            <ul>
              <li *ngFor="let panel2 of listView">
                <span>{{panel2.id}}</span>
              </li>
            </ul>
            `,
})
export class AppTab implements AfterContentInit, AfterViewInit {

  @ContentChildren(AppPanel) panelContent: QueryList<AppPanel>;
  @ViewChildren(AppPanel) panelView: QueryList<AppPanel>;

  @Input()
  show: boolean;

  listContent: any[] = [];
  listView: any[] = [];


  constructor() { }

  ngAfterContentInit() {
    console.log(this.panelContent);
    this.listContent = this.panelContent.toArray();
    this.panelContent.changes.subscribe(x => this.listContent = x);
  }

  setListView(x: any[]) {
    setTimeout(() => this.listView = x, 0);
  }

  ngAfterViewInit() {
    console.log(this.panelView);
    this.setListView(this.panelView.toArray());
    this.panelView.changes.subscribe(x => this.setListView(x));
  }
}
