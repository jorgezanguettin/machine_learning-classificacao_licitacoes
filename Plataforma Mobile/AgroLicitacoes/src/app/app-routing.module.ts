import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'pagina-inicial',
    loadChildren: () => import('./pagina-inicial/pagina-inicial.module').then( m => m.PaginaInicialPageModule),
  },
  {
    path: 'licitacoes',
    loadChildren: () => import('./licitacoes/licitacoes.module').then( m => m.LicitacoesPageModule),
  },
  {
    path: 'licitacoes-filtradas',
    loadChildren: () => import('./licitacoes-filtradas/licitacoes-filtradas.module').then( m => m.LicitacoesFiltradasPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
  },
  {
    path: 'licitacao-detalhes/:id',
    loadChildren: () => import('./licitacao-detalhes/licitacao-detalhes.module').then( m => m.LicitacaoDetalhesPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./contato/contato.module').then( m => m.ContatoPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
