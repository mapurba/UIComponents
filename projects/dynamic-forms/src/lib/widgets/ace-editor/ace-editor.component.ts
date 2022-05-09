/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/


import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
// import { SplitComponent, SplitAreaDirective, IOutputAreaSizes } from 'angular-split';
import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/mode/xml';

export enum ContentType {
  JS = 'javascript', XML = 'xml', TXT = 'text', js = 'javascript', JSON = 'json'
}
@Component({
  selector: 'form-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css']
})
export class AceEditorComponent implements AfterViewInit {
  public editorRef: any;
  public functionList = [];
  public hideFuns = true;
  // varea: IOutputAreaSizes;
  lastpos: number = 400;
  findFunRegex = new RegExp(`function[ ]+(?<fun>[a-zA-Z0-9_ ]+[ ]*[\(][a-zA-Z0-9\,_ ]*[\)])`);
  @Input("file") _file: any = '/*MF Sample esmaScript*/\n';
  set file(val) {
    this._file = val;
    this.initAce(val);
  }
  get file() {
    return this._file;
  }

  @Input("type") _type?: any
  set type(val) {
    if (ContentType.js == val) {
      this._type = ContentType.JS;
    }
    if (val) {
      this._type = val as ContentType;
    }
  };
  get type() {
    return this._type;
  }

  @Output() fileChange?: EventEmitter<any> = new EventEmitter<any>();
  @Output() change?: EventEmitter<any> = new EventEmitter<any>();
  // @ViewChild(SplitComponent) splitEl: SplitComponent;
  // @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective>;
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;



  constructor() {
  }

  ngOnInit(): void {
  }




  // 4️⃣
  ngAfterViewInit(): void {
    try {
      this.initAce(atob(this._file));
    } catch (error) {
      this.initAce(this.file);
    }
    // this.varea = this.splitEl.getVisibleAreaSizes();
    // this.splitEl.dragProgress$.subscribe(
    //   (e: { gutterNum: number; sizes: Array<number> }) => {
    //     if (this.lastpos > 150 && e.sizes[0] >= 150 && e.sizes[0] <= 211) {
    //       this.closeSideBar(34);
    //       this.lastpos = 34;
    //     }
    //     if (e.sizes[0] > 211) {
    //       this.lastpos = e.sizes[0];
    //     }
    //   }
    // );
    // this.closeSideBar();
  }



  // closeSideBar(newSize: number = 34) {
  //   this.areasEl.first.collapse(newSize);
  // }

  // openSideBar() {
  //   this.areasEl.first.expand();
  //   this.splitEl.setVisibleAreaSizes(this.varea);
  // }


  reset() {
    this.editorRef = null;
  }
  initAce(data: any) {
    let aceMode = 'ace/mode/' + this.type;
    this.reset();
    this.editorRef = ace.edit(this.editor.nativeElement);
    this.editorRef.getSession().setMode(aceMode);
    this.editorRef.session.setValue(data || '');
    this.editorRef.setShowPrintMargin(false);

    this.editorRef.commands.addCommand({
      name: 'myCommand',
      bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
      exec: function (editor) {
        //...
        this.fileChanged.emit(this._file);
      },
      readOnly: true // false if this command should not apply in readOnly mode
    });
    this.editorRef.on("change", () => {
      this.setData();

      if (this._type == ContentType.JS)
        setTimeout(() => {
          this.find('');
        }, 1000);
    });
  }

  setData() {
    try {
      this.fileChange.emit(btoa(this.editorRef.getValue()));
      this.change.emit(btoa(this.editorRef.getValue()));
    } catch (error) {
      this.fileChange.emit(this.editorRef.getValue());
      this.change.emit(this.editorRef.getValue());
    }
  }

  find(string) {

    this.functionList = [];
    this.editorRef.$search.setOptions({
      // needle: "function[ ]+[a-zA-Z0-9_ ]+[ ]*[\(][a-zA-Z0-9\,_ ]*[\)]",
      needle: "function[ ]+(?<fun>[a-zA-Z0-9_ ]+[ ]*[\(][a-zA-Z0-9\,_ ]*[\)])",
      regExp: true,
    });
    let rows = this.editorRef.$search.findAll(this.editorRef.getSession());
    for (let row of rows) {
      let rownum = row.start.row
      let rowString = this.editorRef.getSession().doc.getLine(rownum);
      let tempFunctionName = { name: this.findFunRegex.exec(rowString)[1], rownum: rownum, };
      this.functionList.push(tempFunctionName);
    }
  }

  setHeight(offset = 100) {
    const container = this.editor.nativeElement.getBoundingClientRect();
    let remainingHeight = window.innerHeight - container.top - offset;
    this.editor.nativeElement.style.height = remainingHeight + 'px';
    this.editor.nativeElement.style.maxHeight = remainingHeight + 'px';
    // this.editor.nativeElement.style.width = window.innerWidth + 'px';
  }
}
