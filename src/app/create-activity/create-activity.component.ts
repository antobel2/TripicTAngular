import {Component, Inject, OnInit} from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../Models/post';
import {Activity} from '../Models/activity';
import {CreateActivityDto} from '../Models/DTO/create-activity-dto';
import {TranslateService} from '@ngx-translate/core';
import {NavbarService} from '../Services/navbar.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../interfaces/dialog-data';

@Component({
  selector: 'app-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  constructor(public apiService: WebApiService,
              private route: ActivatedRoute,
              private translate: TranslateService,
              public navBar: NavbarService,
              public dialogRef: MatDialogRef<CreateActivityComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  name: string;
  posts: Post[];

  ngOnInit() {
    this.navBar.show();

    this.posts = [];
    this.name = '';
    // this.apiService.currentTrip = 1;
  }

  upload() {
    if (this.name.length <= 0) {
      this.translate.get('app.alertActivityLength').subscribe((res: string) => {
        alert(res);
      });
      return;
    }

    let dto = new CreateActivityDto(this.name, this.apiService.currentTrip);
    this.apiService.addActivity(dto).subscribe((r) => {
        this.translate.get('app.alertActivityCreate').subscribe((res: string) => {
          alert(res);
          this.dialogRef.close();
        });
      },
      (e) => {
        this.translate.get('app.alertGenericApiError').subscribe((res: string) => {
          alert(res);
        });
      });

  }

  cancel() {
    this.dialogRef.close();
  }
}
