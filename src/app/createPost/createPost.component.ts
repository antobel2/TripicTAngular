import { Component, OnInit } from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute} from '@angular/router';
import {CreatePostDTO} from '../Models/DTO/create-post-dto';
import {CreatePictureDto} from '../Models/DTO/create-picture-dto';
import {forEach} from '@angular/router/src/utils/collection';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-post',
  templateUrl: './createPost.component.html',
  styleUrls: ['./createPost.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(public apiService: WebApiService, private  route: ActivatedRoute, private translate: TranslateService) { }

  text: string;
  pictureURLS: string[];

  ngOnInit() {
    this.pictureURLS = [];
    this.text = '';
  }

  upload() {
    let lstPictureDto: CreatePictureDto[];
    lstPictureDto = [];
    for (let i = 0; i < this.pictureURLS.length; i++){
      // lstPictureDto.push(new CreatePictureDto(this.pictureURLS[i]));
    }
    if (this.pictureURLS.length === 0 && this.text === '') {
      this.translate.get('app.alertPostCreate').subscribe((res: string) => {
        alert(res);
      });
      return;
    }
    // let p: CreatePostDTO = new CreatePostDTO(this.text, lstPictureDto, 0);
    /*console.log(p);
    this.apiService.addPost(p);*/
    /*this.translate.get('app.alertPostWorks').subscribe((res: string) => {
      alert(res);
    });*/
  }

  // Ajoute les images sélectionnées à la liste, vérifie tout ce qui est choisi et affiche les images dans la page
  // Déclenché lors d'un changement dans le file input
  previewImage(files) {

    // Vérifie que des fichiers on été sélectionnés
    if (files.length === 0){
      return;
    }

    // Parcours les fichiers sélectionnés
    for (let i = 0; i < files.length; i++) {

      // Vérifie que le nombre maximum d'image n'a pas été atteint
      if (this.pictureURLS.length >= 3){
        this.translate.get('app.alertImageAmount').subscribe((res: string) => {
          alert(res);
        });
        break;
      }

      // Vérifie que le fichier est de type image
      let mimeType = files[i].type;
      if (mimeType.match(/image\/*/) == null) {
        this.translate.get('app.alertImageType').subscribe((res: string) => {
          alert(res);
        });
      // Vérifie que la taille maximum est respectée
      } else if (files[i].size > 10485760) {
        this.translate.get('app.alertImageSize').subscribe((res: string) => {
          alert(res);
        });
      // Ajoute les URLs des fichiers à la liste
      } else {
        let readerFor = new FileReader();
        readerFor.readAsDataURL(files[i]);

        // La liste des URLs est lue pour les aperçus des images dans la page
        readerFor.onload = (event) => {
          this.pictureURLS.push((<any>readerFor.result));
          console.log(this.pictureURLS);
        };
      }
    }
  }
}
