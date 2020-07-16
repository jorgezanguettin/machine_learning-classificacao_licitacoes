import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'pagina-inicial',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pagina-inicial/pagina-inicial.module').then(m => m.PaginaInicialPageModule),
              canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'licitacoes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../licitacoes/licitacoes.module').then(m => m.LicitacoesPageModule),
              canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'licitacoes-filtradas',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../licitacoes-filtradas/licitacoes-filtradas.module').then(m => m.LicitacoesFiltradasPageModule),
              canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../perfil/perfil.module').then(m => m.PerfilPageModule),
              canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/pagina-inicial',
        pathMatch: 'full',
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/pagina-inicial',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
