# Angular microfrontend using native federation
Native federation supports **ES build**

## remote project

Create the remote application
```
ng new remote --standalone false
```

Add native federation into the remote application - define project, port (in our case **remote**)
```
ng add @angular-architects/native-federation --project remote --port 4201 --type remote
```
Schematics will create *federation.config.js* which we need to update like this:

```javascript
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  /// edit this name - it should be specific for each remote application
  name: 'remote',

  /// define key and path to the remote remote module (it should be different of app.module.ts)
  exposes: {
    './remoteModule': './src/app/remote-main/remote-main.module.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]
  
});
```


## shell project
Create the shell application
```
ng new shell --standalone false
```

Add native federation into the remote application - define project, port (in our case **shell**)
```
ng add @angular-architects/native-federation --project shell --port 4200 --type dynamic-host
```

In the assets edit federation.manifest.json
```json
{
	"remote": "http://localhost:4201/remoteEntry.json"
}
```

Schematics will create also *federation.config.js* which we are going to let as is.
Also schematics will change **main.ts** which is now initializing Federation 

```typescript
import { initFederation } from '@angular-architects/native-federation';

initFederation('/assets/federation.manifest.json')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
```

Last step is to edit routing in router module to define async route to remote application:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeShellComponent } from './home-shell/home-shell.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

const routes: Routes = [
  {
    path: '',
    component: HomeShellComponent,
    pathMatch: 'full',
  },
  {
    /// this is our remote application route
    path: 'remote',
    loadChildren: () =>
      loadRemoteModule('remote', './remoteModule').then((m) => m.RemoteMainModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Issues
Don't forget to setup remote module (entry point in remote app for shell) exactly as is app.module.ts.
This is because we need to register services (in providers, add HttpClientModule and others to support functionality)