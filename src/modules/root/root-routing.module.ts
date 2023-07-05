import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GalleryView} from "./views/gallery/gallery.view";
import {LoginView} from "./views/login/login.view";
import {AuthGuard} from "lbox-auth";
import {ProfileView} from "./views/profile/profile.view";
import {RecoveryView} from "./views/recovery/recovery.view";
import {FileView} from "./views/file/file.view";

const routes: Routes = [
  {path: 'login', component: LoginView},
  {path: 'recovery/:activity', component: RecoveryView},
  {path: '', component: GalleryView, canActivate: [AuthGuard]},
  {path: 'gallery', component: GalleryView, canActivate: [AuthGuard]},
  {path: 'file', component: FileView, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileView, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RootRoutingModule {
}
